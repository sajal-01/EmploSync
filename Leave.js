// import React, { useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';

// export default function Leave() {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [reason, setReason] = useState('');

//   const handleApply = () => {
//     // Handle leave application submission
//     console.log(`Start Date: ${startDate}`);
//     console.log(`End Date: ${endDate}`);
//     console.log(`Reason: ${reason}`);
//   };

//   return (
//     <View>
//       <Text>Start Date:</Text>
//       <TextInput
//         placeholder="YYYY-MM-DD"
//         value={startDate}
//         onChangeText={setStartDate}
//         keyboardType="numeric"
//       />

//       <Text>End Date:</Text>
//       <TextInput
//         placeholder="YYYY-MM-DD"
//         value={endDate}
//         onChangeText={setEndDate}
//         keyboardType="numeric"
//       />

//       <Text>Reason:</Text>
//       <TextInput
//         placeholder="Enter reason for leave"
//         value={reason}
//         onChangeText={setReason}
//       />

//       <Button title="Apply" onPress={handleApply} />
//     </View>
//   );
// }
