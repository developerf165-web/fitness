import { useState, useEffect, useCallback } from 'react';
import { getCoachById } from '@services/Personal/coachService';

/**
 * Custom hook барои идоракунии маълумоти тренер
 * @param {string} id - ID тренер
 * @returns {Object} - { coachData, loading, error, refetch }
 */
export const useTrainer = (id) => {
    const [coachData, setCoachData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCoach = useCallback(async () => {
        if (!id) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await getCoachById(id);
            setCoachData(data);
        } catch (err) {
            console.error('Error loading coach:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchCoach();
    }, [fetchCoach]);

    return {
        coachData,
        loading,
        error,
        refetch: fetchCoach,
    };
};
