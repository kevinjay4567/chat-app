import Pusher from "pusher-js";

const pusher = new Pusher('971a03571bef0feffa2c', {
  cluster: 'us2'
});

export { pusher };

