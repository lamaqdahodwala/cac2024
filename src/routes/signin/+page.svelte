<script lang="ts">
    import { SignIn } from '@auth/sveltekit/components';
    import { fade, slide, fly } from 'svelte/transition';
    import { spring } from 'svelte/motion';
    import { onMount } from 'svelte';

    let isSignIn = false;
    let email = '';
    let password = '';
    let confirmPassword = '';
    let errorMessage = '';
    let isLoading = false;
    let mouseX = spring(0);
    let mouseY = spring(0);

    function toggleMode() {
        isSignIn = !isSignIn;
        errorMessage = '';
    }

    async function handleSubmit() {
        isLoading = true;
        errorMessage = '';
        if (!isSignIn && password !== confirmPassword) {
            errorMessage = 'Passwords do not match';
            isLoading = false;
            return;
        }
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log('Form submitted:', { email, password });
        } catch (err) {
            errorMessage = 'An error occurred. Please try again.';
        } finally {
            isLoading = false;
        }
    }

    function handleMouseMove(event: any) {
        mouseX.set(event.clientX);
        mouseY.set(event.clientY);
    }

    onMount(() => {
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    });
</script>

<svelte:window on:mousemove={handleMouseMove}/>

<div class="split-screen" style="--mouse-x: {$mouseX}px; --mouse-y: {$mouseY}px;">
    <div class="left">
        <div class="decorative-shapes">
            <div class="shape shape1"></div>
            <div class="shape shape2"></div>
            <div class="shape shape3"></div>
            <div class="gradient-overlay"></div>
            <div class="floating-spheres">
                <div class="sphere sphere1"></div>
                <div class="sphere sphere2"></div>
                <div class="sphere sphere3"></div>
            </div>
        </div>
        <div class="left-content">
            <h1 class="title">Welcome to BrainBlox</h1>
            <p class="subtitle">Learn about AI in a fun, interactive way. Train your own AI models, explore AI concepts, and share your projects with friends!</p>
            <ul class="features">
                <li>Interactive Tutorials</li>
                <li>Gamified Learning</li>
                <li>Build & Share AI Models</li>
                <li>AI Playground</li>
            </ul>
        </div>
    </div>

    <div class="right">
        <div class="decorative-lines">
            <div class="line line1"></div>
            <div class="line line2"></div>
            <div class="line line3"></div>
        </div>
        <div class="auth-container">
            <div class="auth-box" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
                <h1 class="title has-text-centered">{isSignIn ? 'Welcome Back!' : 'Join the Adventure!'}</h1>
                <form on:submit|preventDefault={handleSubmit}>
                    <div class="field animated-field">
                        <label for="email" class="label">Email</label>
                        <div class="control has-icons-left">
                            <input type="email" id="email" bind:value={email} placeholder="e.g. bobsmith@gmail.com" class="input animated-input" required>
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div class="field animated-field">
                        <label for="password" class="label">Password</label>
                        <div class="control has-icons-left">
                            <input type="password" id="password" bind:value={password} placeholder="*******" class="input animated-input" required>
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    {#if !isSignIn}
                    <div class="field animated-field">
                        <label for="confirmPassword" class="label">Confirm Password</label>
                        <div class="control has-icons-left">
                            <input type="password" id="confirmPassword" bind:value={confirmPassword} placeholder="*******" class="input animated-input" required>
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    {/if}
                    {#if errorMessage}
                    <p class="help is-danger animated-error">{errorMessage}</p>
                    {/if}
                    <div class="field mt-5">
                        <button type="submit" class="button is-primary is-fullwidth animated-button" class:is-loading={isLoading}>
                            {isSignIn ? 'Sign In' : 'Register'}
                        </button>
                    </div>
                </form>
                <div class="is-divider" data-content="OR"></div>
                <div class="field">
                    <SignIn provider="google" class="button is-fullwidth is-info animated-button">
                    </SignIn>
                </div>

                <div class="has-text-centered mt-5">
                    <a href="#" on:click|preventDefault={toggleMode} class="is-size-7">
                        {isSignIn ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
    :root {
        --secondary-color: #f14668;
        --background-color: #f5f7fa;
        --text-color: #2c3e50;
    }
    .split-screen {
        display: flex;
        min-height: 100vh;
        overflow: hidden;
        background: var(--background-color);
        position: relative;
    }
    .left, .right {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 40px;
        transition: all 0.3s ease;
    }
    .left {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        color: var(--text-color);
        text-align: center;
        position: relative;
        overflow: hidden;
    }
    .decorative-shapes {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }
    .shape {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        animation: floating 6s ease-in-out infinite;
        transition: all 0.3s ease;
    }
    .shape1 {
        width: 100px;
        height: 100px;
        top: 10%;
        left: 15%;
        animation-delay: 0s;
    }
    .shape2 {
        width: 150px;
        height: 150px;
        top: 60%;
        left: 70%;
        animation-delay: 2s;
    }
    .shape3 {
        width: 75px;
        height: 75px;
        top: 40%;
        left: 30%;
        animation-delay: 4s;
    }
    .gradient-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0.1));
        z-index: 0;
        transition: all 0.3s ease;
    }
    .floating-spheres {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: space-around;
        z-index: 1;
    }
    .sphere {
        width: 50px;
        height: 50px;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%);
        border-radius: 50%;
        animation: sphereFloating 8s ease-in-out infinite;
        transition: all 0.3s ease;
    }
    .sphere1 {
        animation-delay: 0s;
    }
    .sphere2 {
        animation-delay: 3s;
    }
    .sphere3 {
        animation-delay: 6s;
    }
    @keyframes floating {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(10deg);
        }
    }
    @keyframes sphereFloating {
        0%, 100% {
            transform: translateY(0) scale(1);
        }
        50% {
            transform: translateY(-15px) scale(1.1);
        }
    }
    .left-content {
        max-width: 400px;
        z-index: 2;
    }
    .left .title {
        font-size: 3.2rem;
        color: var(--text-color);
        margin-bottom: 3.2rem;
        transition: all 0.3s ease;
        line-height: 60px;
        font-weight: 650;
    }
    .left .subtitle {
        font-size: 1.4rem;
        color: #7f8c8d;
        margin-bottom: 2rem;
        transition: all 0.3s ease;
        line-height: 1.5;
        font-weight: 500;
    }
    .features {
        list-style: none;
        padding: 0;
    }
    .features li {
        font-size: 1.25rem;
        color: #34495e;
        margin-bottom: 0.75rem;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    .interactive-demo {
        margin-top: 2rem;
        position: relative;
        height: 200px;
    }
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 0.5;
        }
        50% {
            transform: scale(1.5);
            opacity: 1;
        }
    }
    .right {
        background: linear-gradient(135deg, #c3cfe2 0%, #f5f7fa 100%);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;
    }
    .decorative-lines {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    }
    .line {
        position: absolute;
        height: 200px;
        background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));
        border-radius: 100%;
        animation: slideIn 10s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
        transition: all 0.3s ease;
    }
    .line1 {
        width: 60%;
        top: 10%;
        right: -20%;
        animation-delay: 0s;
    }
    .line2 {
        width: 80%;
        top: 50%;
        right: -30%;
        animation-delay: 3s;
    }
    .line3 {
        width: 50%;
        top: 90%;
        right: -10%;
        animation-delay: 6s;
    }
    @keyframes slideIn {
        0% {
            transform: translateX(0) rotate(0deg);
        }
        100% {
            transform: translateX(50px) rotate(5deg);
        }
    }
    .auth-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .auth-box {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        width: 100%;
        max-width: 400px;
        transition: all 0.5s ease-in-out;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        position: relative;
        z-index: 1;
    }
    .input, .button {
        border-radius: 20px;
        transition: all 0.3s ease;
    }
    .animated-input {
        transition: all 0.3s ease;
    }
    .animated-input:focus {
        border-color: #3273dc;
        box-shadow: 0 0 0 3px rgba(50, 115, 220, 0.2);
    }
    .animated-field {
        position: relative;
        margin-bottom: 1.5rem;
    }
    .animated-field::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        background: linear-gradient(to right, #3273dc, var(--secondary-color));
        bottom: -5px;
        left: 0;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
    }
    .animated-field:focus-within::after {
        transform: scaleX(1);
        transform-origin: left;
    }
    .animated-error {
        animation: shake 0.5s ease;
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25%, 75% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
    }
    .animated-button {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    .animated-button::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.5);
        opacity: 0;
        border-radius: 100%;
        transform: scale(1, 1) translate(-50%, -50%);
        transform-origin: 50% 50%;
    }
    @keyframes ripple {
        0% {
            transform: scale(0, 0);
            opacity: 1;
        }
        20% {
            transform: scale(25, 25);
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: scale(40, 40);
        }
    }
    .animated-button:focus:not(:active)::after {
        animation: ripple 1s ease-out;
    }
    .is-divider {
        display: flex;
        align-items: center;
        text-align: center;
        margin: 1rem 0;
    }
    .is-divider::before, .is-divider::after {
        content: "";
        flex: 1;
        background: #dbdbdb;
        height: 1px;
        margin: 0 1rem;
    }
    .field .label {
        color: #4a4a4a;
        transition: all 0.3s ease;
    }
    .title {
        font-family: 'Poppins', sans-serif;
        color: var(--text-color);
        font-weight: 600;
        transition: all 0.3s ease;
    }
    .help.is-danger {
        color: var(--secondary-color);
        transition: all 0.3s ease;
    }
    .has-text-centered {
        text-align: center;
    }
    a.is-size-7 {
        font-size: 0.875rem;
        color: #3273dc;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    a.is-size-7:hover {
        color: #275aa8;
    }
    .auth-box:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    }
    .split-screen::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
            circle 10vmax at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.3),
            transparent 100%
        );
        pointer-events: none;
        z-index: 1;
    }
    .left:hover .shape,
    .left:hover .sphere {
        filter: hue-rotate(45deg);
    }
    .right:hover .line {
        filter: hue-rotate(-45deg);
    }
    .auth-box:hover .animated-input {
        transform: translateY(-2px);
    }
    .animated-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    @media screen and (max-width: 768px) {
        .split-screen {
            flex-direction: column;
        }
        .left, .right {
            width: 100%;
            height: 50vh;
        }
    }
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }
</style>
