import React from 'react'

export default function GetHelp() {
    return (
        <>
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
        <div className="bg-card rounded-lg shadow-lg p-8 m-5 max-w-sm w-full">
          <h2 className="text-lg font-semibold text-primary-foreground">Get Help</h2>
          <p className="text-muted-foreground mb-4">Please enter your registered details and we will send you an OTP to reset your password.</p>
          <form>
            <div className="mb-4">
              <label className="block text-sm  text-muted-foreground" htmlFor="username">USERNAME</label>
              <input type="text" id="username" placeholder="Enter Email ID or Mobile Number *" className="mt-1 block w-full border border-border rounded-md p-2 focus:ring focus:ring-ring" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm  text-muted-foreground" htmlFor="dob">DATE OF BIRTH</label>
              <input type="date" id="dob" className="mt-1 block w-full border border-border rounded-md p-2 focus:ring focus:ring-ring" required />
            </div>
            <button type="submit" className="bg-primary-foreground text-secondary hover:bg-primary/80 w-full font-medium p-2 rounded-full">Reset Password</button>
          </form>
        </div>
      </div>
      </>
    )
}