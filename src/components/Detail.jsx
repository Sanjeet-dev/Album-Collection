import React, { useEffect, useState } from 'react';
const Detail = () => {
  const [users, setUsers] = useState([]);

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




  const deleteUser = async (itemId) =>{

    try{

    await fetch(`https://jsonplaceholder.typicode.com/albums/${itemId}`, {
      method: 'DELETE',
    });
    setUsers(users.filter((user) => user.id !== itemId));

    }catch(error){
      console.log(error);
    }
  };

  return (
    <>
      <div className="title">
        <h2>album list</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center">
        {
          users.map((person, index) => {
            return (
              <div key={index}>
                <article className="album-item">
                  <img src="60111.jpg" className="photo" alt="dummy-photo" />
                  <div className="item-info">
                    <header className="id">
                      <h4>User-Id:{person.userId}</h4>
                      <h4 className="identity">Id:{person.id}</h4>
                    </header>
                    <p className="item-text">
                      <span> title:</span>{person.title}
                    </p>
                    <div className="btn-container">
                      <button>update</button>
                      <button onClick={() => deleteUser(person.id)} >delete</button>
                    </div>
                  </div>
                </article>
              </div>
            )
          })
        }
      </div>
    </>

  )
}
export default Detail;