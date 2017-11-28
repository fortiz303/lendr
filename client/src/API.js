const headers = new Headers({
  'Content-Type': 'application/json'
});

export const API = {
  freeTransaction(id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token
        },
        method: 'GET'
      };

      fetch(`/api/v1/transaction/free/${id}`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data.user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  lockTransaction(id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token
        },
        method: 'GET'
      };

      fetch(`/api/v1/transaction/lock/${id}`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data.user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  acceptLoan(data, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers, 
        method: 'POST',
        body: JSON.stringify({
          ...data,
          token: token
        })
      }

      fetch('/api/v1/transaction/accept', opts)
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
  newTransaction(data, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          ...data,
          token: token
        })
      };
      
      fetch('/api/v1/transaction/new', opts)
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

    });
  },
  authenticate(token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          token: token
        })
      };

      fetch('/api/v1/auth/authenticate', opts)
        .then(res => res.json())
        .then((data) => {
          if (data.success) {
            resolve(data);
          } else {
            reject(data)
          }
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
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
  fetchUserById(id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token
        },
        method: 'GET'
      };

      fetch(`/api/v1/user/${id}`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data.user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchTransactionById(id, token) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: {
          ...headers,
          'x-access-token': token,
        },
        method: 'GET'
      }

      fetch(`/api/v1/transaction/${id}`, opts)
        .then(res => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  loginUser(email, pass) {
    return new Promise((resolve, reject) => {
      const opts = {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: pass
        })
      };
      fetch(`/api/v1/auth/login`, opts)
        .then(res => res.json())
        .then((data) => {
          console.log(data)
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
          email: email,
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
