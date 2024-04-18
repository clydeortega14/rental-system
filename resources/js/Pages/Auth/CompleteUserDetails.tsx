import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

function CompleteUserDetails({ user } : {user:object}){


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

				<form className="mt-6 space-y-6">
					
					<div>
						<InputLabel htmlFor="name" value="Name" />

						<TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={user.name}
                        required
                        isFocused
                        autoComplete="name"
                    />
					</div>

					<div>
						<InputLabel htmlFor="email" value="Email" />

						<TextInput
                        id="email"
                        className="mt-1 block w-full"
                        value={user.email}
                        required
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
                        
                        required
                        isFocused
                        autoComplete="company-name"
                    />
					</div>

					<div>
						<InputLabel htmlFor="tin" value="TIN (Tax Identification Number)" />

						<TextInput
                        id="tin"
                        className="mt-1 block w-full"
                        
                        required
                        isFocused
                        autoComplete="tin"
                    />
					</div>

					<div>
						<InputLabel htmlFor="industry-years" value="Years in the industry" />

						<TextInput
                        id="industry-years"
                        className="mt-1 block w-full"
                        
                        required
                        isFocused
                        autoComplete="industry-years"
                    />
					</div>

					<div>
						<InputLabel htmlFor="valid-id" value="Valid ID (atleast 1 valid id)" />

						<TextInput
						type="file"
                        id="valid-id"
                        className="mt-1 block w-full"
                        
                        required
                        isFocused
                        autoComplete="valid-id"
                    />
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
                        
                        required
                        isFocused
                        autoComplete="tel-contact"
                    />
					</div>

					<div>
						<InputLabel htmlFor="mobile" value="Mobile" />

						<TextInput
                        id="mobile"
                        className="mt-1 block w-full"
                        
                        required
                        isFocused
                        autoComplete="mobile"
                    />
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