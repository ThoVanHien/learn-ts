# learn-ts
## TUPLE
//Normal
let arr = ['hien', 30, false];
arr[0] = 10;
arr[1] = 'hien';
//Tuple: đúng kiểu đúng vị trí
const tup: [string, boolean, number] = ['hien', false, 5];

## GENERIC
### Arr toàn string
type myArr = Array<string>;
const last = (arr: Array<any>) => arr[arr.length - 1];
const l1 = last([1, 2, 3]); //không nên dùng kiểu any
### Muốn giá trị trả về là 1 kiểu xác định thì tuple
const lastT = <T>(arr: Array<T>) => arr[arr.length - 1];
const l3 = lastT([1, 2, 3]); //kiểu trả về là number
const l4 = lastT(['1', 2, 3]); //kiểu trả về là string | number
const l5 = lastT<string>(['1', '2', '3']); // Chỉ định T là string

const makeArrT = <T>(x: T) => [x]; //Trả về mảng có kiểu dữ liệu T
const m1 = makeArrT<number>(10); //chỉ định rõ
const m2 = makeArrT('10'); //ngầm định

const makeArrXY = <X, Y>(x: X, y: Y) => [x, y]; //Trả về mảng có kiểu dữ liệu X|Y (có thể đổi chổ)
const mXY1 = makeArrXY([1, 2], '3'); //[x: string|number[], y: string|number[]] hoặc viết tắt là []string|number[]
//mXY1[0] = '3'; //Cho phép

const makeArrTuple = <X, Y>(x: X, y: Y): [X, Y] => [x, y]; //tuple kết hợp với generic (không thể thay đổi vị trí)
const mAT1 = makeArrTuple<string, number>('5', 5); //Trả về mảng có kiểu dữ liệu number|string[]
const mAT2 = makeArrTuple(10, '5'); //[number,string]
//mAT2[0] = '10'; //Không cho phép

const makeTupleWithDefault = <X, Y = number>(x: X, y: Y): [X, Y] => [x, y]; //Tuple kết hợp generic kết hợp default type
//const mtwd1 = makeTupleWithDefault<number | string>('10', '10');//không cho phép vì không truyền thì mặc định là number

## GENERIC EXTENDS
const makeFullName = (obj) => ({
  ...obj,
  fullName: `${obj.firstName} + ${obj.lastName}`,
});
const makeFullNameConstraint = (obj: {
  firstName: string;
  lastName: string;
}) => ({
  ...obj,
  fullName: `${obj.firstName} + ${obj.lastName}`,
});
const n1 = makeFullNameConstraint({ firstName: 'Hien', lastName: 'Tho' });
// const n2 = makeFullNameConstraint({
//   firstName: 'Hien',
//   lastName: 'Tho',
//   age: 30,
// }); // không cho phép gán thêm age

const makeFullNameConstraintWithGeneric = <
  T extends { firstName: string; lastName: string }
>(
  obj: T
) => ({
  ...obj,
  fullName: `${obj.firstName} + ${obj.lastName}`,
});

const n3 = makeFullNameConstraintWithGeneric({
  firstName: 'hien',
  lastName: 'tho',
  age: 23,
}); // n3: có 4 property gồm 2 cái kế thừa là f và l và fullName và khai báo thêm

//Chú ý với toán tử spread

## GENERIC IN INTERFACE
interface Resource<T> {
  uid: number;
  name: string;
  data: T;
}

const r1: Resource<number[]> = {
  uid: 10,
  name: 'hien',
  data: [10, 10],
}; //Phải truyền T hoặc gán
type NumberResouce = Resource<number[]>;
const r2: NumberResouce = {
  uid: 10,
  name: 'hien',
  data: [10, 10],
};
