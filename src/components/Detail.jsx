import React, { useEffect, useState } from 'react';

const Detail = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    userId: '',
    id: '',
    title: '',
  });


  useEffect(() => {
    getUsersDetail();
  }, []);

  const getUsersDetail = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (itemId) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${itemId}`, {
        method: 'DELETE',
      });
      setUsers(users.filter((user) => user.id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = (user) => {
    setSelectedUser(user);
    setEditedUser(user);
  };

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${selectedUser.id}`, {
        method: 'PUT',
        body: JSON.stringify(editedUser),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      setUsers(users.map((user) => (user.id === selectedUser.id ? editedUser : user)));
      setSelectedUser(null);
      setEditedUser({ userId: '', id: '', title: '' });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="title">
        <h2>album list</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center">
        {users.map((person, index) => {
          return (
            <div key={index}>
              <article className="album-item">
                <img src="60111.jpg" className="photo" alt="dummy-photo" />
                <div className="item-info">
                  <header className="id">
                    <h4>User-Id: {person.userId}</h4>
                    <h4 className="identity">Id: {person.id}</h4>
                  </header>
                  <p className="item-text">
                    <span>title:</span> {person.title}
                  </p>
                  <div className="btn-container">
                    <button onClick={() => updateUser(person)}>update</button>
                    <button onClick={() => deleteUser(person.id)}>delete</button>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {
        selectedUser &&
        (
          <div className="form-container">
            <h4 className="title">Edit User</h4>
            <form onSubmit={handleSubmit}>
              <label classNmae="userid">
                User ID:
                <input
                  type="text"
                  name="userId"
                  value={editedUser.userId}
                  onChange={handleInputChange}
                />
              </label>
              <label className="id">
                ID:
                <input
                  type="text"
                  name="id"
                  value={editedUser.id}
                  onChange={handleInputChange}
                />
              </label>
              <label className="para">
                Title:
                <input
                  className="titleInput"
                  type="text"
                  name="title"
                  value={editedUser.title}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Save</button>
              <button onClick={() => setSelectedUser(null)}>Cancel</button>
            </form>
          </div>
        )
      }
    </>
  )
}
export default Detail;
