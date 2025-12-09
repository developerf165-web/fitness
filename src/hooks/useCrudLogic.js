import { useCallback } from 'react';

/**
 * Generic hook for handling CRUD operations.
 * 
 * @param {Object} params - Configuration object
 * @param {Function} params.createApi - Async function to create an item
 * @param {Function} params.updateApi - Async function to update an item
 * @param {Function} params.deleteApi - Async function to delete an item
 * @param {Function} params.transformResponse - Optional function to transform API response before state update
 * @param {Function} params.setItems - State setter for the list of items
 * @param {Object} params.formModal - Modal state object for the form (isOpen, close, setIsSubmitting, editingItem)
 * @param {Object} params.deleteModal - Modal state object for deletion (isOpen, close, setIsDeleting, itemToDelete)
 * @param {Function} params.showToast - Function to show toast notifications
 * @param {Object} params.logging - Optional logging configuration { enabled: boolean, namespace: string }
 */
export default function useCrudLogic({
    createApi,
    updateApi,
    deleteApi,
    transformResponse = (item) => item,
    setItems,
    refetch, // Option to refetch data after mutation
    formModal,
    deleteModal,
    showToast,
    logging = { enabled: false, namespace: 'CRUD' }
}) {
    const log = useCallback((message, data) => {
        if (logging.enabled) {
            console.log(`[${logging.namespace}] ${message}`, data || '');
        }
    }, [logging]);

    // --- DELETE ---
    const handleConfirmDelete = async () => {
        if (!deleteModal || !deleteModal.itemToDelete) return;

        const itemId = deleteModal.itemToDelete.id;
        log('handleConfirmDelete called', { itemId });

        if (deleteModal.setIsDeleting) deleteModal.setIsDeleting(true);

        try {
            if (deleteApi) {
                await deleteApi(itemId);
            }

            setItems(currentItems =>
                currentItems.filter(item => item.id !== itemId)
            );

            deleteModal.close();
            if (showToast) showToast('success', 'Успешно', 'Элемент успешно удален');
        } catch (err) {
            console.error(`[${logging.namespace}] Delete Error:`, err);
            if (showToast) showToast('error', 'Ошибка', `Ошибка при удалении: ${err.message}`);
        } finally {
            if (deleteModal.setIsDeleting) deleteModal.setIsDeleting(false);
        }
    };

    // --- CREATE ---
    const handleCreate = async (formData, successMessage = 'Успешно создано') => {
        log('handleCreate called', formData);

        if (formModal && formModal.setIsSubmitting) formModal.setIsSubmitting(true);

        try {
            let newItem;
            if (createApi) {
                newItem = await createApi(formData);
            } else {
                // Fallback for mock data if no API provided (e.g. Courses/Directions needing ID)
                newItem = { id: Date.now(), ...formData };
            }

            const transformedItem = transformResponse(newItem);

            // If we have a reliable ID, update local state
            if (transformedItem && (transformedItem.id || transformedItem.id === 0)) {
                setItems(prev => [...prev, transformedItem]);
            }

            if (formModal) formModal.close();
            if (showToast) showToast('success', 'Успешно', successMessage);

            // Refetch to ensure consistency
            if (refetch) {
                await refetch();
            }
        } catch (err) {
            console.error(`[${logging.namespace}] Create Error:`, err);
            if (showToast) showToast('error', 'Ошибка', `Ошибка при создании: ${err.message}`);
        } finally {
            if (formModal && formModal.setIsSubmitting) formModal.setIsSubmitting(false);
        }
    };

    // --- UPDATE ---
    const handleUpdate = async (formData, successMessage = 'Успешно обновлено') => {
        if (!formModal || !formModal.editingItem) return;

        const itemId = formModal.editingItem.id;
        log('handleUpdate called', { itemId, formData });

        if (formModal.setIsSubmitting) formModal.setIsSubmitting(true);

        try {
            let updatedItem;
            if (updateApi) {
                updatedItem = await updateApi(itemId, formData);
            } else {
                // Fallback
                updatedItem = { ...formModal.editingItem, ...formData };
            }

            const transformedItem = transformResponse(updatedItem);

            // Guard against bad data (NaN) before local update
            // Check if essential fields are valid (not undefined/NaN for critical numbers)
            const isValidUpdate = transformedItem &&
                (transformedItem.price !== undefined && !isNaN(transformedItem.price));

            if (isValidUpdate) {
                setItems(prev => prev.map(item =>
                    item.id === itemId ? transformedItem : item
                ));
            }

            if (formModal) formModal.close();
            if (showToast) showToast('success', 'Успешно', successMessage);

            // Refetch to ensure consistency
            if (refetch) {
                await refetch();
            }
        } catch (err) {
            console.error(`[${logging.namespace}] Update Error:`, err);
            if (showToast) showToast('error', 'Ошибка', `Ошибка при обновлении: ${err.message}`);
        } finally {
            if (formModal && formModal.setIsSubmitting) formModal.setIsSubmitting(false);
        }
    };

    // --- SUBMIT WRAPPER ---
    const handleSubmit = (createMsg, updateMsg) => (formData) => {
        if (formModal && formModal.editingItem) {
            handleUpdate(formData, updateMsg);
        } else {
            handleCreate(formData, createMsg);
        }
    };

    return {
        handleConfirmDelete,
        handleCreate,
        handleUpdate,
        handleSubmit
    };
}
