import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="mb-3 border-b border-gray-200">
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="flex flex-row justify-between items-center py-3"
      >
        <Text className="text-base font-bold text-gray-800 dark:text-slate-100">{question}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#000"
        />
      </TouchableOpacity>
      {isOpen && (
        <View className="mt-2 mb-3">
          <Text className="text-sm text-gray-600 dark:text-slate-200">{answer}</Text>
        </View>
      )}
    </View>
  );
};

const FAQsScreen: React.FC = () => {
  const faqs = [
    {
      question: 'How do I get assigned shipments?',
      answer: 'Shipments are assigned based on your availability and proximity to the pickup location. Make sure your app is active and your location is updated.',
    },
    {
      question: 'What documents do I need to upload as a driver?',
      answer: 'You need to upload your driving license, vehicle registration, and insurance documents during registration.',
    },
    {
      question: 'How do I update my vehicle details?',
      answer: 'Go to your profile section and select "Vehicle Details" to update or add new vehicle information.',
    },
    {
      question: 'What happens if I am unable to complete a shipment?',
      answer: 'If you cannot complete a shipment, notify support immediately. You may be penalized for repeated cancellations without valid reasons.',
    },
    {
      question: 'How do I receive payment for completed shipments?',
      answer: 'Payments are processed automatically after successful delivery and are credited to your linked bank account within 2-3 business days.',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-100 dark:bg-slate-900">
    <View className="p-4 bg-white dark:bg-slate-700 dark:text-slate-400">
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </View>
    </SafeAreaView>
  );
};

export default FAQsScreen;
