function generateTempID() {
    const radomPart = Math.random().toString(36).substring(2, 8);
    return radomPart.toUpperCase();
}

const orderID = generateTempID();
console.log(`ID ออเดอร์ชั่วคราว: ${orderID}`);