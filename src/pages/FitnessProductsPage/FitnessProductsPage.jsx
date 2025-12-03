import React, { useState } from "react";
import ProfileHeader from "@/components/trainer/ProfileHeader";
import SearchComponent from "@/Dashboard/components/SearchComponent";
import AddProductModal from "@/components/Cards/ProductModal/AddProductModal";
import AddCategoryModal from "@/components/Cards/ProductModal/AddCategoryModal"; 
import EditProductModal from "@/components/Cards/ProductModal/EditProductModal"; 
import DeleteConfirmationModal from "@/components/Cards/ProductModal/DeleteConfirmationModal"; 
import { products as initialProducts, filters as initialFilters } from "./data/products";
import ProductCard from "./components/ProductCard";
import FilterChips from "../../components/common/FilterChips";
import AddButton from "@/components/ui/AddButton";
import useProductFilter from "../../hooks/useProductFilter";

export default function FitnessProductsPage() {
  // --- 1. ҲОЛАТҲО (STATES) ---
  const [productList, setProductList] = useState(initialProducts);
  const [currentFilters, setCurrentFilters] = useState(initialFilters); 
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false); 
  
  // БАРОИ ТАҲРИР/НЕСТКУНӢ
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🎯 ИСТИФОДАИ CUSTOM HOOK БАРОИ ФИЛТР
  const {
    searchQuery,
    activeFilter,
    filteredItems: filteredProducts,
    setSearch,
    setFilter,
    hasResults
  } = useProductFilter({
    items: productList,
    filters: currentFilters,
    categoryKey: 'category',
    nameKey: 'name'
  });

  // --- 2. ФУНКСИЯҲОИ КОРИИ МОДАЛҲОИ АСОСӢ ---
  const handleAddProductClick = () => {
    setIsProductModalOpen(true);
  };

  const handleAddCategoryClick = () => {
    setIsCategoryModalOpen(true);
  };
  
  const handleSaveProduct = (newProductData) => {
    setIsSaving(true);
    setTimeout(() => {
      const newId = productList.length + 1 + Math.random(); 
      const newProduct = {
        id: newId,
        name: newProductData.title,
        category: newProductData.category || "Нав",
        price: parseFloat(newProductData.price) || 0,
        oldPrice: newProductData.oldPrice ? parseFloat(newProductData.oldPrice) : null,
        discount: newProductData.discount ? parseInt(newProductData.discount) : null,
        imageUrl: newProductData.image
          ? URL.createObjectURL(newProductData.image)
          : 'https://via.placeholder.com/300x300.png?text=New+Item',
      };
      setProductList([newProduct, ...productList]); 
      setIsSaving(false);
      setIsProductModalOpen(false); 
    }, 1500); 
  };

  const handleSaveCategory = (categoryName) => {
    setIsSaving(true);
    setTimeout(() => {
        if (!currentFilters.includes(categoryName)) {
            setCurrentFilters([...currentFilters, categoryName]);
        }
        setIsSaving(false);
        setIsCategoryModalOpen(false);
    }, 1500);
  };

  // --- 3. ФУНКСИЯҲОИ БАРОИ ТАҲРИР (EDIT) ВА НЕСТКУНӢ ---
  const handleEditProductClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProductClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleEditProduct = (id, updatedData) => {
    setIsSaving(true);
    setTimeout(() => {
      setProductList(productList.map(product => 
        product.id === id 
          ? { 
              ...product, 
              name: updatedData.title,
              category: updatedData.category,
              price: parseFloat(updatedData.price),
              oldPrice: updatedData.oldPrice ? parseFloat(updatedData.oldPrice) : null,
              discount: updatedData.discount ? parseInt(updatedData.discount) : null,
              imageUrl: updatedData.imageUrl,
          }
          : product
      ));
      setIsSaving(false);
      setIsEditModalOpen(false);
      setSelectedProduct(null);
    }, 1500);
  };

  const handleDeleteProduct = (id) => {
    setIsSaving(true);
    setTimeout(() => {
      setProductList(productList.filter(product => product.id !== id));
      setIsSaving(false);
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }, 1500);
  };

  // --- 4. UI (RENDER) ---
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
        filters={currentFilters} 
        activeFilter={activeFilter}
        onFilterChange={setFilter}
        onAddCategoryClick={handleAddCategoryClick}
        showAddButton={true}
      />
      
      <h2 className="text-2xl font-bold my-4">{activeFilter}</h2>
      
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
      
      {!hasResults && (
        <div className="text-center py-10 text-gray-400">
          <p>Ничего не найдено</p>
        </div>
      )}
      
      {/* Модалҳо */}
      <AddProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        isSaving={isSaving}
        onSaveCategory={handleSaveCategory} 
        categories={currentFilters} 
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
            categories={currentFilters} 
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => { setIsDeleteModalOpen(false); setSelectedProduct(null); }}
            onConfirm={() => handleDeleteProduct(selectedProduct.id)}
            isSaving={isSaving}
            itemName={selectedProduct.name}
          />
        </>
      )}
    </div>
  );
}
