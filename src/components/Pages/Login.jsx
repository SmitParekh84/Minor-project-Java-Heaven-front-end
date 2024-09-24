import React from 'react'

export default function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="bg-secondary rounded-lg shadow-lg m-5    p-11 max-w-sm w-full">
                <h2 className="text-2xl text-center font-bold text-primary-foreground mb-6">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-muted-foreground" htmlFor="username">USERNAME</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="Enter Email ID or Mobile Number *" 
                            className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-muted-foreground" htmlFor="password">PASSWORD</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter Password *" 
                            className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring" 
                            required 
                        />
                    </div>
                    <p className="mb-4 text-muted-foreground">
                    Don't have an account? <a href="/sign-up" className="text-primary-foreground">Sign Up</a>
                </p>
                    <button 
                        type="submit" 
                        className="w-full bg-primary-foreground text-secondary hover:bg-primary-foreground/80 py-2 rounded-full font-semibold "
                    >
                        Login
                    </button>
                </form>
                
                <p className="mt-2 text-muted-foreground">
                    Facing trouble logging in? <a href="/get-help" className="text-primary-foreground">Get Help</a>
                </p>
                
            </div>
        </div>
        
    )
}