const host = "http://127.0.0.1:8000";
const body_table = document.getElementById("table");
const buttton = document.getElementById("buton");
const textfiled = document.getElementById("textfield");
const checkparent = document.getElementById("checket_parent");
const ID = document.getElementById("ID");
const NOMBRE = document.getElementById("NOMBRE");
const DESCRIPCION = document.getElementById("DESCRIPCION");
let datos = [];
const handleGetInfo = () => {
  axios.get(host + "/api/brands/read").then((res) => {
    if (!res.data.status) {
      datos.push(...res.data);
      createTable();
    }
  });
};

handleGetInfo();

//--- Codigo creación de tabla-----
const createTable = () => {
  datos.forEach((item) => {
    body_table.append(
      addRow(CreateCheckbox(item.CODIGO_MARCA_PK), [
        addColumn(item.CODIGO_MARCA_PK),
        addColumn(item.TB_MARCAS_NOMBRE_DE_LA_MARCA),
        addColumn(item.TB_MARCAS_USUARIO),
      ])
    );
  });
};

const addRow = (check, columns) => {
  const tr = document.createElement("TR");
  tr.setAttribute("role", "button");
  tr.append(check);
  columns.forEach((td) => {
    tr.appendChild(td);
  });
  return tr;
};

const addColumn = (value) => {
  const td = document.createElement("TD");
  td.textContent = value;
  return td;
};


//--- Codigo  click checbox-----
const CreateCheckbox = (key) => {
  const checkbox = document.createElement("input");
  checkbox.value = key;
  checkbox.name = "marcas";
  checkbox.type = "checkbox";
  checkbox;
  return checkbox;
};

const AdddValueCheck = () => {
  const chek = document.querySelectorAll("input[name='marcas']:checked");
  const values = Array.from(chek).map((item) => item.value);

  if (["", "0"].includes(textfiled.value)) {
    textfiled.classList.add("is-invalid");
    return false;
  } else {
    textfiled.classList.remove("is-invalid");
  }
  console.log(values);
  console.log(textfiled.value);
};

buttton.addEventListener("click", () => AdddValueCheck());

checkparent.addEventListener("change", () => {
  const not = "input[name='marcas']:not(input[name='marcas']:checked)";
  const check = "input[name='marcas']:checked";

  const items = document.querySelectorAll(checkparent.checked ? not : check);
  items.forEach((ck) => {
    ck.checked = checkparent.checked ? true : false;
  });
});


//--- Codigo  click tr modal-----
const getRowValues = () => {
  table.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
      return false;
    }
    const row = e.target.closest("tr");
    const data = Array.from(row.cells).map((cell) => cell.textContent);
    SetFields(data);
    showModal();
  });
};

const showModal = () => {
  const ModalNational = new bootstrap.Modal(
    document.getElementById("National"),
    {
      keyboard: false,
      backdrop: "static",
    }
  );

  ModalNational.show();
};

const SetFields = (key) => {
  ID.value = key[0];
  NOMBRE.value = key[1];
  DESCRIPCION.value = key[2];
};

getRowValues();
