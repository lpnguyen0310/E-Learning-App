import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, CheckBox } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { useUser  } from '../contexts/UserContext';
import { ref, update } from "firebase/database";
import { database } from "../components/firebaseConfig"; // Import the initialized Firebase app
const Cart = ({route}) => {
    const { cart, removeFromCart,setCart } = useCart();
    const [selectedItems, setSelectedItems] = useState([]);
    const { user, setUserData } = useUser();
    // Tính tổng tiền các khóa học đã chọn
    const calculateTotal = () => {
        if (!Array.isArray(selectedItems) || !Array.isArray(cart)) {
            return 0; // Đảm bảo cả selectedItems và cart đều là mảng
        }
    
        return selectedItems
            .map((itemId) => {
                const item = cart.find((course) => course.id === itemId);
                if (item && item.price) {
                    // Loại bỏ ký tự `$` và chuyển đổi sang số
                    const numericPrice = parseFloat(item.price.replace('$', ''));
                    
                    // Kiểm tra nếu có giảm giá và tính toán giá sau giảm
                    const priceAfterDiscount = item.discount ? numericPrice * 0.8 : numericPrice; // Giảm 20% nếu có discount
                    
                    return isNaN(priceAfterDiscount) ? 0 : priceAfterDiscount; // Trả về giá sau khi giảm
                }
                return 0;
            })
            .reduce((total, price) => total + price, 0) // Tính tổng
            .toFixed(2); // Làm tròn đến 2 chữ số thập phân
    };
    // Xử lý chọn/deselect khóa học
    const toggleSelection = (itemId) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(itemId)
                ? prevSelected.filter((id) => id !== itemId)
                : [...prevSelected, itemId]
        );
    };

    const renderCartItem = ({ item }) => {
        // Tính toán giá sau giảm
        const numericPrice = parseFloat(item.price.replace('$', ''));
        const priceAfterDiscount = item.discount ? numericPrice * 0.8 : numericPrice;
        const formattedPrice = priceAfterDiscount.toFixed(2); // Làm tròn giá sau giảm
    
        return (
            <View style={styles.cartItem}>
                <CheckBox
                    value={selectedItems.includes(item.id)}
                    onValueChange={() => toggleSelection(item.id)}
                />
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <View style={styles.priceContainer}>
                        {item.discount && (
                            <Text style={[styles.itemPrice, styles.strikethroughPrice]}>${numericPrice.toFixed(2)}</Text> // Giá gốc gạch ngang
                        )}
                        <Text style={styles.itemPrice}>${formattedPrice}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const handleCheckout = async () => {
        try {
            if (!user) {
                console.error("User is not logged in.");
                return;
            }
    
            // Lọc các khóa học đã chọn
            const selectedCourses = cart.filter((item) => selectedItems.includes(item.id));
            const newCourses = selectedCourses.filter(
                (course) => !user.courses.some((existingCourse) => existingCourse.id === course.id)
            );
    
            if (newCourses.length === 0) {
                alert("No new courses to add!");
                return;
            }
    
            // Cập nhật user trong state và Firebase
            const updatedCourses = [...(user.courses || []), ...newCourses];
            setUserData((prevUser) => ({
                ...prevUser,
                courses: updatedCourses,
            }));
    
            /// Đồng bộ với Firebase
        const userRef = ref(database, `Users/users/${user.uid}`);
        await update(userRef, { courses: updatedCourses });
    
            // Xóa các khóa học đã checkout khỏi giỏ hàng
            setSelectedItems([]);
            setCart((prevCart) => prevCart.filter((item) => !selectedItems.includes(item.id)));
    
            alert("Checkout successful!");
        } catch (error) {
            console.error("Error updating Firebase:", error);
        }
    };

    // Hàm kiểm tra console nhận được uid không
    // const handleCheckout = () => {
    //     const selectedCourses = cart.filter((item) => selectedItems.includes(item.id));
    //     const newCourses = selectedCourses.filter(
    //         (course) => !user.courses.some((existingCourse) => existingCourse.id === course.id)
    //     );
    
    //     setUserData((prevUser) => {
    //         const updatedUser = {
    //             ...prevUser,
    //             courses: [...(prevUser.courses || []), ...newCourses],
    //         };
    //         console.log("Updated user:", updatedUser); // Debug giá trị user
    //         return updatedUser;
    //     });
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Your Cart</Text>
            {cart.length > 0 ? (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderCartItem}
                    />
                    <View style={styles.footer}>
                        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
                        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                            <Text style={styles.checkoutButtonText}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    removeButton: {
        padding: 5,
        backgroundColor: '#ff4d4d',
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    removeButtonText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
    },
    footer: {
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    checkoutButton: {
        width: '90%',
        paddingVertical: 12,
        backgroundColor: '#4caf50',
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    emptyCartText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },


    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    strikethroughPrice: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
});

export default Cart;
