import React, { useEffect, useState } from 'react';
import Loader from './UI/Loader';
import ApiManager from '../services/ApiManager';
import OrderCard from './UI/OrderCard';
import TransitionsModal from './UI/Modal';
import StatusForm from './UI/Form/StatusForm';

const OrdersCard = () => {
    const [showModal, setShowModal] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const [currentOrder, setCurrentOrder] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await ApiManager.getOrders();
            const productsArray = Object.entries(response);
            setItems(productsArray);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (status, order) => {
        try {
            const body = {
                ...order,
                orderStatus: status
            }
            await ApiManager.updateOrderStatus(currentOrderId, body);
            fetchItems();
        } catch (error) {
            console.log(error);
        } finally {
            setShowModal(false);
        }
    };

    const openStatusModal = (id) => {
        setCurrentOrderId(id);
        const order = items.find(([itemId]) => itemId === id)[1];
        setCurrentOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const actions = [
        { label: 'Update Status', onClick: (id) => openStatusModal(id) },
    ];

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '2rem',
                justifyContent: 'flex-start',
                paddingLeft: 10,
                paddingRight: 10
            }}>
                {items.map(([id, orderData]) => (
                    <div key={id} style={{
                        flex: '1 1 30%',
                        minWidth: '250px',
                        maxWidth: '300px',
                        marginBottom: '1.5rem'
                    }}>
                        <OrderCard
                            orderId={orderData.orderId}
                            userName={orderData.userName}
                            email={orderData.email}
                            address={orderData.address}
                            orderDate={orderData.orderDate}
                            orderStatus={orderData.orderStatus}
                            orderTotal={orderData.orderTotal}
                            items={orderData.items}
                            actions={actions}
                            id={id}
                        />
                    </div>
                ))}
            </div>
            <Loader loading={loading} />
            <TransitionsModal show={showModal} onClose={handleCloseModal} title={"Update Status"}>
                <StatusForm onSubmit={handleStatusUpdate} order={currentOrder} />
            </TransitionsModal>
        </>
    );
}

export default OrdersCard;
