import React, { useState, useMemo } from "react";

import FitnessPageHeader from "./components/FitnessPageHeader";
import FitnessCategoryBar from "./components/FitnessCategoryBar";
import FitnessProductList from "./components/FitnessProductList";

import AddProductModal from "./modals/AddProductModal";
import AddCategoryModal from "./modals/AddCategoryModal";
import EditProductModal from "./modals/EditProductModal";
import DeleteConfirmationModal from "../../components/ui/DeleteConfirmationModal";

import useProductFilter from "../../hooks/useProductFilter";
import { useProducts } from "../../features/products/hooks/useProducts";
import { useCategories } from "../../features/products/hooks/useCategories";
import { useToast } from "../components/Toast/ToastContext";

export default function FitnessProductsPage() {
  // --- 1. HOOKS & STATE ---
  const {
    products,
    pagination,
    currentPage,
    isLoading: isProductsLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    error,
    handlePageChange
  } = useProducts();

  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    error: catError,
    isLoading: catLoading,
    getCategoryNameById,
    getCategoryIdByName
  } = useCategories();

  // Debug logging
  console.log("Categories:", categories);
  console.log("Cat Error:", catError);

  const { showToast } = useToast();

  // Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isCategoryDeleteModalOpen, setIsCategoryDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Map products to include proper category names (Backend sends ID, Frontend needs Name)
  const mappedProducts = useMemo(() => {
    return products.map(p => ({
      ...p,
      category: getCategoryNameById(p.category) || p.category
    }));
  }, [products, getCategoryNameById]);

  // Filter Hook
  const {
    searchQuery,
    activeFilter,
    filteredItems: filteredProducts,
    setSearch,
    setFilter,
    resetFilters,
  } = useProductFilter({
    items: mappedProducts,
    filters: categories,
    categoryKey: 'category',
    nameKey: 'name'
  });

  // --- 2. HANDLERS ---

  const handleAddProductClick = () => {
    setIsProductModalOpen(true);
  };

  const handleAddCategoryClick = () => {
    setSelectedCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleEditCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsCategoryDeleteModalOpen(true);
  };

  const handleSaveProduct = async (newProductData) => {
    setIsSaving(true);
    const result = await addProduct({
      name: newProductData.title,
      category: getCategoryIdByName(newProductData.category) || 1, // Fallback to 1 if not found
      price: parseFloat(newProductData.price) || 0,
      oldPrice: newProductData.oldPrice ? parseFloat(newProductData.oldPrice) : null,
      discount: newProductData.discount ? parseInt(newProductData.discount) : null,
      image: newProductData.image,
      description: newProductData.description
    });

    setIsSaving(false);
    if (result.success) {
      setIsProductModalOpen(false);
      showToast('success', 'Успешно', 'Продукт успешно добавлен!');
    } else {
      console.error(result.error);
      showToast('error', 'Ошибка', 'Ошибка при добавлении продукта');
    }
  };

  const handleSaveCategory = async (categoryName) => {
    setIsSaving(true);

    if (selectedCategory) {
      // Edit Mode
      const id = getCategoryIdByName(selectedCategory);
      if (!id) {
        setIsSaving(false);
        showToast('error', 'Ошибка', 'Не удалось найти ID категории');
        return;
      }

      console.log(`Updating category '${selectedCategory}' (ID: ${id}) to '${categoryName}'`);
      const result = await updateCategory(id, categoryName);

      setIsSaving(false);
      if (result.success) {
        setIsCategoryModalOpen(false);
        setSelectedCategory(null);
        showToast('success', 'Успешно', `Категория обновлена: ${categoryName}`);
      } else {
        showToast('error', 'Ошибка', 'Ошибка при обновлении категории: ' + result.error);
      }
    } else {
      // Add Mode
      const result = await addCategory(categoryName);
      setIsSaving(false);
      if (result.success) {
        setIsCategoryModalOpen(false);
        showToast('success', 'Успешно', 'Категория успешно добавлена!');
      } else {
        showToast('error', 'Ошибка', 'Ошибка при добавлении категории: ' + result.error);
      }
    }
  };

  const handleDeleteCategory = async () => {
    setIsSaving(true);
    // Delete Mode
    const id = getCategoryIdByName(selectedCategory);
    if (!id) {
      setIsSaving(false);
      showToast('error', 'Ошибка', 'Не удалось найти ID категории');
      return;
    }

    console.log(`Deleting category '${selectedCategory}' (ID: ${id})`);
    const result = await deleteCategory(id);

    setIsSaving(false);
    if (result.success) {
      setIsCategoryDeleteModalOpen(false);
      const catName = selectedCategory;
      setSelectedCategory(null);

      // If active filter was the deleted category, reset it
      if (activeFilter === catName) {
        setFilter("Все");
      }

      showToast('success', 'Успешно', `Категория удалена: ${catName}`);
    } else {
      showToast('error', 'Ошибка', 'Ошибка при удалении категории: ' + result.error);
    }
  };

  const handleEditProductClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProductClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleEditProduct = async (id, updatedData) => {
    setIsSaving(true);
    const result = await updateProduct(id, {
      name: updatedData.title,
      category: getCategoryIdByName(updatedData.category), // Map name back to ID
      price: parseFloat(updatedData.price),
      oldPrice: updatedData.oldPrice ? parseFloat(updatedData.oldPrice) : null,
      discount: updatedData.discount ? parseInt(updatedData.discount) : null,
      imageUrl: updatedData.imageUrl,
      image: updatedData.image,
      description: updatedData.description || selectedProduct.description
    });

    setIsSaving(false);
    if (result.success) {
      setIsEditModalOpen(false);
      setSelectedProduct(null);
      showToast('success', 'Успешно', 'Продукт успешно обновлен!');
    } else {
      console.error(result.error);
      showToast('error', 'Ошибка', 'Ошибка при обновлении продукта');
    }
  };

  const handleDeleteProduct = async (id) => {
    setIsSaving(true);
    const result = await deleteProduct(id);
    setIsSaving(false);

    if (result.success) {
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
      showToast('success', 'Успешно', 'Продукт успешно удален!');
    } else {
      console.error(result.error);
      showToast('error', 'Ошибка', 'Ошибка при удалении продукта');
    }
  };

  // --- 3. RENDER ---
  return (
    <div className="min-h-screen text-white pt-4">

      <FitnessPageHeader
        onAddProduct={handleAddProductClick}
        searchQuery={searchQuery}
        setSearch={setSearch}
      />

      <FitnessCategoryBar
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={setFilter}
        onAddCategory={handleAddCategoryClick}
        onEditCategory={handleEditCategoryClick}
        onDeleteCategory={handleDeleteCategoryClick}
      />

      <FitnessProductList
        isLoading={isProductsLoading}
        error={error}
        products={filteredProducts}
        pagination={pagination}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onEditProduct={handleEditProductClick}
        onDeleteProduct={handleDeleteProductClick}
      />

      {/* Модалҳо */}
      <AddProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        isSaving={isSaving}
        onSaveCategory={handleSaveCategory}
        categories={categories}
      />

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategory}
        isSaving={isSaving}
        initialValue={selectedCategory}
      />

      <DeleteConfirmationModal
        isOpen={isCategoryDeleteModalOpen}
        onClose={() => setIsCategoryDeleteModalOpen(false)}
        onConfirm={handleDeleteCategory}
        isDeleting={isSaving}
        itemName={selectedCategory}
        customMessage={`Вы действительно хотите удалить категорию "${selectedCategory}"?`}
      />

      {selectedProduct && (
        <>
          <EditProductModal
            isOpen={isEditModalOpen}
            onClose={() => { setIsEditModalOpen(false); setSelectedProduct(null); }}
            onSave={handleEditProduct}
            isSaving={isSaving}
            product={selectedProduct}
            categories={categories}
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => { setIsDeleteModalOpen(false); setSelectedProduct(null); }}
            onConfirm={() => handleDeleteProduct(selectedProduct.id)}
            isDeleting={isSaving}
            itemName={selectedProduct.name}
            customMessage="Вы действительно хотите удалить этот продукт?"
          />
        </>
      )}

      {selectedProduct && (
        <>
          <EditProductModal
            isOpen={isEditModalOpen}
            onClose={() => { setIsEditModalOpen(false); setSelectedProduct(null); }}
            onSave={handleEditProduct}
            isSaving={isSaving}
            product={selectedProduct}
            categories={categories}
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => { setIsDeleteModalOpen(false); setSelectedProduct(null); }}
            onConfirm={() => handleDeleteProduct(selectedProduct.id)}
            isDeleting={isSaving}
            itemName={selectedProduct.name}
            customMessage="Вы действительно хотите удалить этот продукт?"
          />
        </>
      )}
    </div>
  );
}
