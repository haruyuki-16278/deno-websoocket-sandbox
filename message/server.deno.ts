Deno.serve({
  port: 8000,
  handler: async (req) => {
  // const url = new URL(req.url);
  if (req.headers.get("upgrade") === "websocket") {
    const {socket, response} = Deno.upgradeWebSocket(req);
    
    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };
    socket.onmessage = (event) => {
      socket.send("RECEIVED:" + event.data);
    };
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
    socket.onerror = (err) => {
      console.error(err);
    };

    return response;
  }

  const file = await Deno.open("./public/index.html", { read: true });
  return new Response(file.readable);
}});
