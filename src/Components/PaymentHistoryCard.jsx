

const PaymentHistoryCard = ({payment,len}) => {
    let count = len + 0
    const {_id,email,name,transactionId,date} = payment;
    const convertToLocalDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // This will return the local date and time
      };
    console.log(payment.transactionId)
    return (
        <>
      <tr>
        <th>{count+ 1}</th>
        <td>{email}</td>
        <td>{name}</td>
        <td className="text-green-600">{transactionId}</td>
        <td>{convertToLocalDateTime(date)}</td>
      </tr>
    </>
    );
};

export default PaymentHistoryCard;