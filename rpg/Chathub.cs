using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace rpg
{
    public class ChatHub : Hub
    {
        public void SendMessage(string msg)
        {
            Clients.All.sendMessage(msg);
        }

        public void SendKill(string msg)
        {
            Clients.All.sendKill(msg);
        }

        public void AddUser(string user)
        {
            Clients.All.addUser(user);
        }

        public void Clone(string id, string src)
        {
            Clients.All.clone(id, src);
        }

        public void SetPosition(string l, string t, string id)
        {
            Clients.Others.setPosition(l, t, id);
        }

    }
}