import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import InputError from '@/Components/InputError';

function CompleteUserDetails({ user } : {user:object}){

	const { data, setData, post, processing, errors } = useForm({

		id: user.id,
		name: user.name,
		email: user.email,
		company_name: '',
		tin: '',
		years_experience: '',
		valid_id: '',
		telephone: '',
		mobile: '',
	})

	const submit: FormEventHandler = (e) => {
		
		e.preventDefault();

		post(route('store.completing.user'));
	}


	return (

		<GuestLayout>
			<Head title="Complete User Details" />


			<section>
				<header>
					<h2 className="text-lg font-medium text-gray-900">Personal Information</h2>

	                <p className="mt-1 text-sm text-gray-600">
	                   Please complete your personal information
	                </p>
				</header>

				<form onSubmit={submit} className="mt-6 space-y-6" enctype="multipart/form-data">

					<div>
						<TextInput
							type="hidden"
							className="mt-1 block w-full"
							value={data.id}
							autoComplete="user_id"
						 />
					</div>
					
					<div>
						<InputLabel htmlFor="name" value="Name" />

						<TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        disabled
                        isFocused
                        autoComplete="name"
                    />
					</div>

					<div>
						<InputLabel htmlFor="email" value="Email" />

						<TextInput
                        id="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        disabled
                        isFocused
                        autoComplete="email"
                    />
					</div>

					<header>
						<h2 className="text-lg font-medium text-gray-900">Company</h2>

	                	<p className="mt-1 text-sm text-gray-600">
	                  	 	Complete your company information
	                	</p>
					</header>

					<div>
						<InputLabel htmlFor="company-name" value="Name of your company" />

						<TextInput
	                        id="company-name"
	                        className="mt-1 block w-full"
	                        value={data.company_name}
	                        onChange={ (e) => setData('company_name', e.target.value) }
	                        
	                        isFocused
	                        autoComplete="company-name"
	                    />

	                    <InputError className="mt-2" message={errors.company_name} />
					</div>

					<div>
						<InputLabel htmlFor="tin" value="TIN (Tax Identification Number)" />

						<TextInput
	                        id="tin"
	                        className="mt-1 block w-full"
	                        value={data.tin}
	                        onChange={(e) => setData('tin', e.target.value)}
	                        
	                        isFocused
	                        autoComplete="tin"
	                    />

	                    <InputError className="mt-2" message={errors.tin} />
					</div>

					<div>
						<InputLabel htmlFor="industry-years" value="Years in the industry" />

						<TextInput
	                        id="industry-years"
	                        className="mt-1 block w-full"
	                        value={data.years_experience}
	                        onChange={(e) => setData('years_experience', e.target.value)}
	                        
	                        isFocused
	                        autoComplete="industry-years"
	                    />
	                    <InputError className="mt-2" message={errors.years_experience} />
					</div>

					<div>
						<InputLabel htmlFor="valid-id" value="Valid ID (atleast 1 valid id)" />

						<TextInput
							type="file"
	                        id="valid-id"
	                        className="mt-1 block w-full"
	                        value={data.valid_id}
	                        onChange={(e) => setData('valid_id', e.target.value)}
	                        
	                        isFocused
	                        autoComplete="valid-id"
	                    />

	                    <InputError className="mt-2" message={errors.valid_id} />
					</div>

					<header>
						<h2 className="text-lg font-medium text-gray-900">Contact Details</h2>

	                	<p className="mt-1 text-sm text-gray-600">
	                  	 	Please provide your updated contact details
	                	</p>
					</header>

					<div>
						<InputLabel htmlFor="tel-contact" value="Telephone (Optional)" />

						<TextInput
	                        id="tel-contact"
	                        className="mt-1 block w-full"
	                        value={data.telephone}
	                        onChange={(e) => setData('telephone', e.target.value)}
	                        
	                        isFocused
	                        autoComplete="tel-contact"
	                    />

	                    <InputError className="mt-2" message={errors.telephone} />
					</div>

					<div>
						<InputLabel htmlFor="mobile" value="Mobile" />

						<TextInput
	                        id="mobile"
	                        className="mt-1 block w-full"
	                        value={data.mobile}
	                        onChange={(e) => setData('mobile', e.target.value)}
	                        
	                        isFocused
	                        autoComplete="mobile"
	                    />
	                    <InputError className="mt-2" message={errors.mobile} />
					</div>

					<div className="flex items-center gap-4">
						<PrimaryButton>
							Submit
						</PrimaryButton>
					</div>
				</form>
			</section>

		</GuestLayout>
	);

}


export default CompleteUserDetails;