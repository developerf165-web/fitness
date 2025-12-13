import React from 'react';
import ProfileHeader from '@/components/trainer/ProfileHeader';
import SearchComponent from '@/Dashboard/components/SearchComponent';
import AddButton from '../../../components/ui/AddButton';

/**
 * FitnessPageHeader
 * Renders the page title, "Add Product" button, and search bar.
 */
const FitnessPageHeader = ({
    title = "Продукты",
    onAddProduct,
    searchQuery,
    setSearch
}) => {
    return (
        <>
            <ProfileHeader
                title={title}
                rightContent={<AddButton onClick={onAddProduct} />}
            />

            <div className="mb-4">
                <SearchComponent query={searchQuery} setQuery={setSearch} />
            </div>
        </>
    );
};

export default FitnessPageHeader;
