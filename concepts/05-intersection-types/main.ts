import { log } from "../_shared/log";

// Intersection means: combine multiple types together.
type User = {
  id: number;
  name: string;
};

type Employee = {
  department: string;
};

type EmployeeUser = User & Employee;

const employee: EmployeeUser = {
  id: 1,
  name: "Shubham",
  department: "Engineering",
};

log("employee (User & Employee) =", employee);

// ---------- common real-world usage ----------
type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductUIState = {
  isSelected: boolean;
  isLoading: boolean;
};

type ProductViewModel = Product & ProductUIState;

const product: ProductViewModel = {
  id: 1,
  name: "Laptop",
  price: 75000,
  isSelected: false,
  isLoading: false,
};

log("product (Product & ProductUIState) =", product);

// ---------- union (A | B, either shape) vs intersection (A & B, both shapes) ----------
type UnionExample = User | Employee;
type IntersectionExample = User & Employee;

const onlyUser: UnionExample = { id: 2, name: "Rahul" };
const both: IntersectionExample = { id: 3, name: "Priya", department: "Sales" };

log("onlyUser (union, satisfies just User) =", onlyUser);
log("both (intersection, must satisfy both) =", both);
