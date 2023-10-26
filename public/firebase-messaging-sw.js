// import firebase from "firebase/compat/app";
// import "firebase/compat/messaging";

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// 	apiKey: "AIzaSyAelUva8ArxU3rhPo9ZCGcQsv61aZpPfHQ",
// 	authDomain: "capefluttermvvm.firebaseapp.com",
// 	projectId: "capefluttermvvm",
// 	storageBucket: "capefluttermvvm.appspot.com",
// 	messagingSenderId: "477199306502",
// 	appId: "1:477199306502:web:69499ab60d1740cc105887",
// };

// firebase.initializeApp(firebaseConfig);

// onBackgroundMessage(messaging, (payload) => {
// 	console.log("[firebase-messaging-sw.js] Received background message ", payload);
// 	// Customize notification here
// 	const notificationTitle = "Background Message Title";
// 	const notificationOptions = {
// 		body: "Background Message body.",
// 		icon: "./favicon.ico",
// 	};

// 	self.registration.showNotification(notificationTitle, notificationOptions);
// });

// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// // eslint-disable-next-line no-undef
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// if ("serviceWorker" in navigator) {
// 	navigator.serviceWorker
// 		.register("./firebase-messaging-sw.js")
// 		.then(function (registration) {
// 			console.log("Registration successful, scope is:", registration.scope);
// 		})
// 		.catch(function (err) {
// 			console.log("Service worker registration failed, error:", err);
// 		});
// }

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
// 	apiKey: "AIzaSyAelUva8ArxU3rhPo9ZCGcQsv61aZpPfHQ",
// 	authDomain: "capefluttermvvm.firebaseapp.com",
// 	projectId: "capefluttermvvm",
// 	storageBucket: "capefluttermvvm.appspot.com",
// 	messagingSenderId: "477199306502",
// 	appId: "1:477199306502:web:69499ab60d1740cc105887",
// };

// // eslint-disable-next-line no-undef
// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// // eslint-disable-next-line no-undef
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
// 	console.log("Received background message ", payload);

// 	const notificationTitle = payload.notification.title;
// 	const notificationOptions = {
// 		body: payload.notification.body,
// 		icon: "/logo192.png",
// 	};

// 	// eslint-disable-next-line no-restricted-globals
// 	return self.registration.showNotification(notificationTitle, notificationOptions);
// });
