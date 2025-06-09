import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { FeedbackType, isFeedbackType } from '@/types/Feedback';
import { PageProps } from '@/types';

export default function Create({ auth, feedbackTypes }: PageProps & { feedbackTypes: string[] }) {
    const { data, setData, post, processing } = useForm({
        type: FeedbackType.SUGGESTION,
        message: '',
        contact_email: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFeedbackType(data.type)) return;
        post(route('feedback.store'));
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            {/* START OF VISUAL ENHANCEMENTS */}
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
                        {/* Header Section */}
                        <div className="bg-blue-600 px-6 py-4">
                            <h2 className="text-2xl font-bold text-white">Rental Experience Feedback</h2>
                            <p className="text-blue-100 mt-1">Help us improve our service</p>
                        </div>

                        {/* Form Container */}
                        <form onSubmit={handleSubmit} className="space-y-6 p-6">
                            {/* Feedback Type Selector */}
                            <div className="space-y-2">
                                <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700">
                                    Feedback Type
                                </label>
                                <select
                                    id="feedbackType"
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value as FeedbackType)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                                    required
                                >
                                    {Object.entries(FeedbackType).map(([key, value]) => (
                                        <option key={key} value={value}>
                                            {key.replace(/_/g, ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Message Textarea */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Your Feedback
                                </label>
                                <textarea
                                    id="message"
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                                    placeholder="Tell us about your rental experience..."
                                    rows={5}
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
                                    Contact Email (Optional)
                                </label>
                                <input
                                    id="contact_email"
                                    type="email"
                                    value={data.contact_email}
                                    onChange={e => setData('contact_email', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                                    placeholder="your@email.com"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : 'Submit Feedback'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* END OF VISUAL ENHANCEMENTS */}
        </AuthenticatedLayout>
    );
}