Client.create(name: "Liam Smith", phone: "123-456-7890", address: "123 Main St, Anytown, USA", email: "liam.smith@example.com", password: "password", password_confirmation: "password")
Plumber.create(name: "John Doe", manager: true, phone: "098-765-4321", email: "john.doe@example.com", password: "password", password_confirmation: "password")
Job.create(client_id: 1, type_of_work: "Repair", description: "My kitchen sink ain't workin'")
Client.create(name: "Jimmy Jones", phone: "156-356-7690", address: "Jimmy Jones' house", email: "jimmy.jones@example.com", password: "password", password_confirmation: "password")
Job.create(client_id: 3, status: "In progress", start_date: DateTime.now.getlocal, type_of_work: "Unclogging/Cleaning", description: "My toilet is like, super clogged! I need someone to come open up these pipes or whatever!")
Plumber.create(name: "Jesse Barker", phone: "512-423-4353", email: "jesse.barker@example.com", password: "password", password_confirmation: "password")
Assignment.create(plumber_id: 4, job_id: 2)

