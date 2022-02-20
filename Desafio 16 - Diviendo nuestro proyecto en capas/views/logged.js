const usuario = document.getElementById("user");

/* const onLoadUser = () => {
  const name = fetch("http://localhost:4000/logged", { method: "GET" }).then(
    (data) => {
      data.json().then((data) => {
        return data.username;
      });
    }
  );
  console.log(name);
  return name;
}; */
//usuario.innerHTML = onLoadUser();
const onLoadUser = async () => {
  const res = await fetch("http://localhost:4000/api/authentication/logged", {
    method: "GET",
  });
  const { username } = await res.json();
  console.log(username);
  document.getElementById("user").innerHTML = username;
  return username;
};
