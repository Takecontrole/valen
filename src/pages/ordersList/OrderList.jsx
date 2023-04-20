import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "./widgetLg.css";
import {format} from "timeago.js"
import { Badge, Button, Modal, Table } from "react-bootstrap";
export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

function markShipped(orderId, ownerId) {
        axios
            .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
            .then(({ data }) => setOrders(data))
            .catch((e) => console.log(e));
    }
    
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("/orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);
  
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Последние транзакции</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Пользователь</th>
          <th className="widgetLgTh">Дата</th>
          <th className="widgetLgTh">Сумма</th>
          <th className="widgetLgTh">Статус</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgDate">
              {order.owner.name}
            </td>
            <td className="widgetLgDate">{format(order.date)}</td>
            <td className="widgetLgAmount">₽{order.total}</td>
            <td className="widgetLgAmount">{order.address}</td>
          
            <td>
                    {order.status === "processing" ? (
                        <Button style={{ fontSize:"12px", width:"120px", height:"30px"}} onClick={() => markShipped(order._id, order.owner?._id)}>
                            В процессе
                        </Button>
                    ) : (
                        <Badge   bg="success">Доставлено</Badge>
                    )}
                </td>
          </tr>
        ))}
      </table>
    </div>
    );
}