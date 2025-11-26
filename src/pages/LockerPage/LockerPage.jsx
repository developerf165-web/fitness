import React, { useState, useMemo, useCallback } from 'react';
import ProfileHeader from '@/components/trainer/ProfileHeader';
import SearchComponent from '@/Dashboard/components/SearchComponent';
import LockerCard from './LockerCard';
import FilterMenu from './FilterMenu';
import FilterIcon from './FilterIcon';
import AddButton from '../components/ui/AddButton';
import Modal from '../../pages/components/ui/Modal';
import { ALL_LOCKERS, STATUS_ORDER } from './constants';
import AddLockerModal from './AddLockerModal/AddLockerModal';

export default function LockerPage() {
    const [lockers, setLockers] = useState(ALL_LOCKERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        'Занято': false,
        'Свободно': false,
        'Не работает': false,
    });

    const toggleFilterMenu = useCallback(() => {
        setIsFilterOpen(prev => !prev);
    }, []);

    const handleAddLocker = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleSaveLocker = useCallback((new_locker_data) => {
        setLockers(prevLockers => {
            const isDuplicate = prevLockers.some(l => l.id === new_locker_data.id);
            if (isDuplicate) {
                alert(`Шкафчаи №${new_locker_data.id} аллакай вуҷуд дорад.`);
                return prevLockers;
            }
            alert(`Шкафчаи №${new_locker_data.id} (${new_locker_data.status}) илова карда шуд.`);
            return [...prevLockers, new_locker_data];
        });
        setIsModalOpen(false);
    }, []);

    const handleEdit = useCallback((locker) => {
        alert(`Редактировать Шкафчаи №${locker.id}`);
    }, []);

    const handleOpen = useCallback((locker) => {
        alert(`Кушодани Шкафчаи №${locker.id}`);
    }, []);
    
    const handleLock = useCallback((locker) => {
        alert(`Заблокировать Шкафчаи №${locker.id}`);
    }, []);

    const handleDelete = useCallback((locker) => {
        if (window.confirm(`Шумо мутмаинед, ки Шкафчаи №${locker.id}-ро нест кардан мехоҳед?`)) {
            setLockers(prevLockers => prevLockers.filter(l => l.id !== locker.id));
            alert(`Шкафчаи №${locker.id} нест карда шуд.`);
        }
    }, []);

    const filteredLockers = useMemo(() => {
        const activeFilters = Object.keys(filters).filter(key => filters[key]);
        const isFiltering = activeFilters.length > 0;
        const normalizedQuery = searchQuery.toLowerCase();

        return lockers
            .filter(locker => {
                if (isFiltering && !activeFilters.includes(locker.status)) {
                    return false;
                }
                
                const matchesId = String(locker.id).includes(normalizedQuery);
                const matchesStatus = locker.status.toLowerCase().includes(normalizedQuery);
                const matchesName = locker.name && locker.name.toLowerCase().includes(normalizedQuery);

                return matchesId || matchesStatus || matchesName;
            })
            .sort((a, b) => {
                return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
            });
    }, [searchQuery, filters, lockers]);


    return (
        <div className="min-h-screen bg-black mt-4 text-white mx-auto">
            <ProfileHeader 
                title="Шкафчики"
                rightContent={<AddButton onClick={handleAddLocker} />}
            />


            <div className="relative">
                <SearchComponent 
                    query={searchQuery} 
                    setQuery={setSearchQuery} 
                    rightAccessory={<FilterIcon onClick={toggleFilterMenu} />}
                />
                
                {isFilterOpen && (
                    <FilterMenu 
                        filters={filters} 
                        setFilters={setFilters} 
                        onClose={() => setIsFilterOpen(false)}
                        position={{ top: '10px', right: '-10px' }}
                    />
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
                {filteredLockers.length > 0 ? (
                    filteredLockers.map(locker => (
                        <LockerCard 
                            key={locker.id} 
                            locker={locker} 
                            onEdit={handleEdit}
                            onOpen={handleOpen}
                            onLock={handleLock}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-400 mt-10">
                        Ҳеҷ шкафчае ёфт нашуд.
                    </p>
                )}
            </div>
            
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <AddLockerModal
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSaveLocker}
                    />
                </Modal>
            )}
        </div>
    );
}