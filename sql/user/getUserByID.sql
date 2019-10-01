SELECT UserID as UserID,Code as Code, FirstName as fname,
LastName as lname,
Password as pass,
Salt as salt,
t.Name as Type FROM users u
LEFT JOIN m_users_type t ON u.TypeID = t.TypeID
Where UserID = @UserID AND  u.Active = 1