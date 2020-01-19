Process Management app for collecting and organizing methodology of task completion within an organization, to stimulate repeatability and ease of training.

Requirements:
    API endpoints:
        User Registration:
            Post sign up - Create user, return email/username
            Post log in - Validate credentials, Return token
            Put update name - Validate token, update name
            Put update password - Validate credentials, update password 
            Delete account - Validate credentials, remove user
        Departments:
            Post new department - Validate token, add department for user
            Get department - Validate token, return specific department, by user and department name
            Get departments - Validate token, return paginated departments and pagination data
            Put update department - Validate token, find department for update, update values of model instance, update in database
            Delete department - Validate credentials, remove department
        Employees:
            Post new employee - Validate token, add employee for user
            Get employee - Validate token, return specific employee, by user and employee name
            Get employees - Validate token, return paginated employees and pagination data
            Put update employee - Validate token, find employee for update, update values of model instance, update in database
            Delete employee - Validate credentials, remove employee
        Tasks:
            Post new task - Validate token, add task for user
            Get task - Validate token, return specific task, by user and task name
            Get tasks - Validate token, return paginated tasks and pagination data
            Put update task - Validate token, find task for update, update values of model instance, update in database
            Delete task - Validate credentials, remove task
                Steps:
                    Post new step - Validate token, add step for user, for task
                    Get step - Validate token, return specific step, by user, task and step number
                    Get steps - Validate token, return steps by user and task 
                    Put update step - Validate token, find step for update, update values of model instance, update in database
                    Delete step - Validate credentials, remove step
                        Best practices:
                            Post new best practice - Validate token, add best practice for user, for task, for step
                            Get best practice - Validate token, return specific best practice, by id
                            Get best practices - Validate token, return best practices by user, task and step number
                            Put update best practice - Validate token, find best practice for update, update values of model instance, update in database
                            Delete best practice - Validate credentials, remove best practice
                        Common Difficulties:
                            Post new common difficulty - Validate token, add common difficulty for user, for task, for step
                            Get common difficulty - Validate token, return specific common difficulty, by id
                            Get common difficulties - Validate token, return common difficulties by user, task and step number
                            Put update common difficulty - Validate token, find common difficulty for update, update values of model instance, update in database
                            Delete common difficulty - Validate credentials, remove common difficulty
    
    Client Side App Routes:
        User sign up
        User log in
        User dashboard
        Task creation
        Task editing
        Task searching 
        Task assignment
