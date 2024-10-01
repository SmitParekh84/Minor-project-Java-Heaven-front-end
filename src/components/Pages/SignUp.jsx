import React from "react"

export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="bg-secondary rounded-lg shadow-lg m-5 p-11 max-w-sm w-full">
        <h2 className="text-2xl text-center font-bold text-primary-foreground mb-6">
          Sign Up
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-muted-foreground" htmlFor="name">
              NAME
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name *"
              className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground" htmlFor="email">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email ID *"
              className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password *"
              className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-muted-foreground"
              htmlFor="confirm-password"
            >
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password *"
              className="mt-1 block w-full border border-border rounded-md p-2 focus:outline-none focus:ring focus:ring-ring"
              required
            />
          </div>
          <p className="mb-4 text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-primary-foreground">
              Login
            </a>
          </p>
          <button
            type="submit"
            className="w-full bg-primary-foreground text-secondary hover:bg-primary-foreground/80 py-2 rounded-full font-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-2 text-muted-foreground">
          Need assistance?{" "}
          <a href="/get-help" className="text-primary-foreground">
            Get Help
          </a>
        </p>
      </div>
    </div>
  )
}
