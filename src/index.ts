import * as Mailer from './mailer';

//================================Destructuring ES6 || Promise================================
const sendEmail = async ({
  email,
  subject,
  content,
}: {
  email: string;
  subject: string;
  content: string;
}): Promise<boolean> => {
  const res = await Mailer.send(email, subject, content);
  return res;
};

// ================================Callback======================================
function waitAndDo(cb: (param: string) => void) {
  setTimeout(() => {
    cb('Oops!');
  });
}
const cb = (param: string) => {
  return param;
};

//  waitAndDo(param=>{
//   tự hiểu param là string
// })
waitAndDo(cb);

//================================Class================================
class Dog {
  sayHi(param: string): void {
    console.log(param);
  }
}

//================================Interface================================

interface Address {
  city: string;
}
interface Pet {
  name: string;
}
const newPet: Pet = {
  name: 'Meo meo meo',
};
const contacts: Contact[] = [];
const contact: Contact = {
  name: 'Hien',
  phoneNumber: '03132454',
  email: 'thovanhien@gmail.com',
};
contacts.push(contact);
console.log(contacts);

//================================Optional && strictNullCheck && Optional Chaining================================
//Kiểm tra đối số và optional của 1 Interface,Class Nếu func require còn I,C ko require thì báo lỗi(phải config)
if (contact.email) Mailer.send(contact.email, '1', '2');

function getPetName(contact: Contact): string {
  return contact.pet?.name || '';
  //đối với mảng thì contact.address?.[0]
}

//================================Implement interface================================

// class MyContact implements Contact {
//   name: string;
//   phoneNumber: string;

//   constructor(name: string, phoneNumber: string) {
//     this.name = name;
//     this.phoneNumber = phoneNumber;
//   }
// }

// const a = new MyContact('A', '123');
// console.log(a.name);

interface Contact {
  name: string;
  phoneNumber: string;
  email?: string;
  pet?: Pet;
  address?: Address[];
}

interface ContactAdapter {
  getData: () => Promise<Contact[]>;
}

class ContactApp {
  adapter: ContactAdapter;
  constructor(adapter: ContactAdapter) {
    this.adapter = adapter;
  }

  async render() {
    const contacts: Contact[] =
      await this.adapter.getData();
    console.table(contacts);
  }
}

class MyContactAdapter implements ContactAdapter {
  async getData() {
    // TODO: get data from API
    const contacts: Contact[] = [
      { name: 'A', phoneNumber: '123' },
      { name: 'B', phoneNumber: '456' },
    ];
    return contacts;
  }
}

const adapter = new MyContactAdapter();
const app = new ContactApp(adapter);
app.render();

//================================Type inference && Contextual typing================================

function foo() {
  let i: string;
  if (Math.random() > 0.5) {
    i = '1';
  } else i = '2';

  //phải khao báo để nhắc code.
  i.toUpperCase();
}
//Đối với Contextual typing thì chú ý callback, nếu cb run thì khi khai báo ở ngoài TS nhận là any, cb trực tiếp là theo định nghĩa cb

//================================Duck typing================================
//Cứ khai báo 1 obj thì sẽ mặc định có type data. Nếu type data initial === interface thì sẽ push được.
//================================Enum================================
//                  PetType[PetType['Cat'] = 0] = 'Cat'
//================================Union type================================
//                  Kí hiệu : | Dùng để nhắc code(a: '10' | '11' => khi gõ a thì nhắc là '10' hoặc '11') hoặc chỉ định nhiều kiểu dữ liệu
//================================Type Alias================================
//                  type MixType = string | Date | number
