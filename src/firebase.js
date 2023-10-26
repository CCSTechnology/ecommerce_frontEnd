// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "@firebase/messaging";

// const { REACT_APP_FIREBASE_PUBLIC_KEY: vapidKey, REACT_APP_FIREBASE_API_KEY: apiKey } = process.env;

// const firebaseConfig = {
// 	apiKey: "AIzaSyAelUva8ArxU3rhPo9ZCGcQsv61aZpPfHQ",
// 	authDomain: "capefluttermvvm.firebaseapp.com",
// 	projectId: "capefluttermvvm",
// 	storageBucket: "capefluttermvvm.appspot.com",
// 	messagingSenderId: "477199306502",
// 	appId: "1:477199306502:web:69499ab60d1740cc105887",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// export const getNewToken = async () => {
// 	try {
// 		const token = await getToken(messaging, {
// 			vapidKey: "BHMPTB7cgqZZ8yomZ6MWTP4peC8QpBgVhuxOh2jaTzfqYvOBTw4xDAlf5KywCnccfKcs6WxNle3LHNLTisLtlrI",
// 		});
// 		return token;
// 	} catch (error) {
// 		throw new Error(error);
// 	}
// };
// export const onMessageListener = () =>
// 	new Promise((resolve) => {
// 		messaging.onMessage((payload) => {
// 			resolve(payload);
// 		});
// 	});

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

// const messaging = firebase.messaging();

// const { REACT_APP_VAPID_KEY } = process.env;
// const publicKey = "BHMPTB7cgqZZ8yomZ6MWTP4peC8QpBgVhuxOh2jaTzfqYvOBTw4xDAlf5KywCnccfKcs6WxNle3LHNLTisLtlrI";

// export const getNewToken = async () => {
// 	try {
// 		const currentToken = await messaging.getToken({ vapidKey: publicKey });
// 		return Promise.resolve(currentToken);
// 	} catch (error) {
// 		console.log("An error occurred while retrieving token. ", error);
// 		return Promise.reject(error);
// 	}
// };

// export const onMessageListener = () =>
// 	new Promise((resolve) => {
// 		messaging.onMessage((payload) => {
// 			resolve(payload);
// 		});
// 	});
