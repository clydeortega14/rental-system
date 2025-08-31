<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use App\Jobs\SendEmailVerification;
use App\Services\LoginService;

class RegisteredUserController extends Controller
{

    protected $login_service;

    public function __construct(LoginService $login_service)
    {
        $this->login_service = $login_service;
    }
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {

        if($request->has('action'))
        {
            if($request->action === 'emailOnly')
            {
                $this->login_service->loginWithEmail($request);
                // execute loginWithEmailService
            }
        }else{

            $user = User::create([
                'id' => (string) Str::uuid(),
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // event(new Registered($user));

            SendEmailVerification::dispatch($user);

            Auth::login($user);

            return redirect(route('lessee.profile', absolute: false));
        }
    }
}
