import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { FeedbackType, isFeedbackType } from '@/types/Feedback';
import { PageProps } from '@/types';

// const FeedbackForm = () => {
    const FeedbackForm= ({ auth, errors, feedbackTypes }: PageProps) => {
    const { data, setData, post, processing } = useForm({
        type: FeedbackType.SUGGESTION,
        message: '',
        contact_email: ''
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFeedbackType(data.type)) {
            // Handle invalid type
            return;
        }
        post(route('feedback.store'));
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow">
            <div>
                <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700">
                    Feedback Type
                </label>
                <select
                    id="feedbackType"
                    value={data.type}
                    onChange={e => setData('type', e.target.value as FeedbackType)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                >
                    {Object.entries(FeedbackType).map(([key, value]) => (
                        <option key={key} value={value}>
                            {key.replace(/_/g, ' ')}
                        </option>
                    ))}
                </select>
            </div>
            
            <textarea
                value={data.message}
                onChange={e => setData('message', e.target.value)}
                required
            />
            
            <input
                type="email"
                value={data.contact_email}
                onChange={e => setData('contact_email', e.target.value)}
                placeholder="Email (optional)"
            />
            
            <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {processing ? 'Submitting...' : 'Submit Feedback'}
            </button>
        </form>
    );
};
export default FeedbackForm;