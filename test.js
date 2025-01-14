// const arr = [
//   {
//     name: "Dashboard",
//     path: "dashboard",
//     element: "ADMINDASHBOARD",
//   },
//   {
//     name: "User Management",
//     children: [
//       {
//         name: "Create Admin",
//         path: "create-admin",
//         element: "CREATEADMINB",
//       },
//       {
//         name: "Create Faculty",
//         path: "create-faculty",
//         element: "CREATEFACULTY",
//       },
//       {
//         name: "Create Student",
//         path: "create-student",
//         element: "CREATESUTDENT",
//       },
//     ],
//   },
// ];

// // const result = arr.reduce((acc, item) => {
// //   if (item.path && item.element) {
// //     acc.push({
// //       path: item.path,
// //       element: item.element,
// //     });
// //   }
// //   if (item.children) {
// //     item.children.forEach((child) => {
// //       acc.push({
// //         path: child.path,
// //         element: child.element,
// //       });
// //     });
// //   }

// //   return acc;
// // }, []);

// // console.log(result);
// const result = arr.reduce((acc, item) => {
//   if (item.path && item.name) {
//     acc.push({
//       key: item.name,
//       label: "Nav link",
//     });
//   }
//   if (item.children) {
//     acc.push({
//       key: item.name,
//       label: item.name,
//       children: item.children.map((child) => ({
//         key: child.name,
//         label: "NavLink",
//       })),
//     });
//   }

//   return acc;
// }, []);

// console.log(JSON.stringify(result));


