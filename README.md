# Plumb and Proper

For my final project at Flatiron, I've made Plumb and Proper:
a website meant to connect plumbers with clients.

## Functionality

This project features STI, or Single Table Inheritance, meaning you
can create an account as both a plumber AND a client.

As a Client, you can:

* Request plumbing jobs (via the 'Request a Job' tab)
  * Fill out a form to describe the problem and pick what type of work the job entails
* Cancel your job requests
* View your job history
* Keep track of the plumbers assigned to your jobs
* View each job's status, which may be:
  * Requested
  * Accepted
  * In progress
  * Finished
* View the associated 'bill' from a completed job ('Bills' tab)
* 'Pay' the bill

As a plumber, you can:

* View job requests from clients ('Open Job' tab)
  * You can choose to accept a pending job request, or join an ongoing job, if it has open slots available
* View the jobs you've taken ('Assignments' tab)
  * Update the status of your jobs (Accepted, In progress, Finished)
  * Add a slot if the job is too much for one person
    * Jobs have 'slots'
    * The number of slots a job has dictates how many plumbers can join the job
    * Each job starts with just one slot
* Leave a job

Additionally, the first plumber account created is given a 'manager status'.

* This manager account is able to view all plumbers, and has the ability to adjust a plumber's wage attribute (via the 'Manage Plumbers' tab)