import Pusher from "pusher-js";
import { postRequest } from "./http";

Pusher.logToConsole = false;

let authorizer = (channel) => {
  return {
    authorize: (socketId, callback) => {
      postRequest({
        endpoint: "/authenticate/broadcast",
        payload: { socket_id: socketId, channel_name: channel.name },
      })
        .then((res) => {
          callback(null, res.data);
        })
        .catch((err) => {
          callback(new Error(`Error calling auth endpoint: ${err}`), {
            auth: "",
          });
        });
    },
  };
};

export const pusher = new Pusher(import.meta.env.VITE_APP_PUSHER_KEY, {
  cluster: "eu",
  authorizer: authorizer,
});

export const exceptionChannel = pusher.subscribe("private-exception-channel");
