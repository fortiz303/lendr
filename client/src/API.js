const headers = new Headers({
  'Content-Type': 'application/json'
});

export const API = {
  fetchAllTransactions(token){ 
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token
        },
        method: 'GET'
      };

      fetch('/api/v1/transaction', opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
  loginUser(email, pass) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          user_name: email,
          password: pass
        })
      };
      fetch(`/api/v1/auth/login`, opts)
        .then(res => res.json())
        .then((data) => {
          if (data.success) {
            resolve(data)
          } else {
            reject(data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  signupUser(email, pass) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          user_name: email,
          password: pass
        })
      };

      fetch(`/api/v1/auth/signup`, opts)
        .then(res => res.json())
        .then((data) => {
          if (data.success) {
            resolve(data)
          } else {
            reject(data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}