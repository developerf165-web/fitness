import React, { useState } from "react";
import ProfileHeader from "@/components/trainer/ProfileHeader";
import SearchComponent from "@/Dashboard/components/SearchComponent";

import AddProductModal from "./modals/AddProductModal";
import AddCategoryModal from "./modals/AddCategoryModal";
import EditProductModal from "./modals/EditProductModal";
import DeleteConfirmationModal from "../../components/ui/DeleteConfirmationModal";
import ProductCard from "./components/ProductCard";
import ProductCardSkeleton from "./components/ProductCardSkeleton"; // Import Skeleton
import FilterChips from "../../components/common/FilterChips";
import AddButton from "../../components/ui/AddButton";

import useProductFilter from "../../hooks/useProductFilter";
import { useProducts } from "../../features/products/hooks/useProducts";
import { useCategories } from "../../features/products/hooks/useCategories";

export default function FitnessProductsPage() {
  // --- 1. HOOKS & STATE ---
  const {
    products,
    isLoading: isProductsLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    error
  } = useProducts();

  const { categories, addCategory } = useCategories();

  // Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Edit/Delete States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter Hook
  const {
    searchQuery,
    activeFilter,
    filteredItems: filteredProducts,
    setSearch,
    setFilter,
    hasResults
  } = useProductFilter({
    items: products,
    filters: categories,
    categoryKey: 'category',
    nameKey: 'name'
  });

  // --- 2. HANDLERS ---

  const handleAddProductClick = () => {
    setIsProductModalOpen(true);
  };

  const handleAddCategoryClick = () => {
    setIsCategoryModalOpen(true);
  };

  const handleSaveProduct = async (newProductData) => {
    setIsSaving(true);
    const result = await addProduct({
      name: newProductData.title,
      category: newProductData.category || "Нав",
      price: parseFloat(newProductData.price) || 0,
      oldPrice: newProductData.oldPrice ? parseFloat(newProductData.oldPrice) : null,
      discount: newProductData.discount ? parseInt(newProductData.discount) : null,
      image: newProductData.image,
      description: newProductData.description
    });

    setIsSaving(false);
    if (result.success) {
      setIsProductModalOpen(false);
    } else {
      console.error(result.error);
    }
  };

  const handleSaveCategory = async (categoryName) => {
    setIsSaving(true);
    const result = await addCategory(categoryName);
    setIsSaving(false);
    if (result.success) {
      setIsCategoryModalOpen(false);
    } else {
      alert("Ошибка при добавлении категории: " + result.error);
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
      category: updatedData.category,
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
    } else {
      console.error(result.error);
    }
  };

  const handleDeleteProduct = async (id) => {
    setIsSaving(true);
    const result = await deleteProduct(id);
    setIsSaving(false);

    if (result.success) {
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    } else {
      console.error(result.error);
    }
  };

  // --- 3. RENDER ---
  return (
    <div className="min-h-screen text-white pt-4">

      <ProfileHeader
        title="Продукты"
        rightContent={<AddButton onClick={handleAddProductClick} />}
      />

      <div className="mb-4">
        <SearchComponent query={searchQuery} setQuery={setSearch} />
      </div>

      <FilterChips
        filters={categories}
        activeFilter={activeFilter}
        onFilterChange={setFilter}
        onAddCategoryClick={handleAddCategoryClick}
        showAddButton={true}
      />

      <h2 className="text-2xl font-bold my-4">{activeFilter}</h2>

      {/* Loading State: Skeletons */}
      {isProductsLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error State */}
      {!isProductsLoading && error && (
        <div className="text-center py-10 text-red-500">
          <p>Ошибка при загрузке продуктов. Пожалуйста, попробуйте позже.</p>
          <p className="text-sm text-gray-400 mt-2">{error.message || "Неизвестная ошибка"}</p>
        </div>
      )}

      {/* Product Grid */}
      {!isProductsLoading && !error && (
        <>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProductClick}
                  onDelete={handleDeleteProductClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <p>Ничего не найдено</p>
            </div>
          )}
        </>
      )}

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
    </div>
  );
}
