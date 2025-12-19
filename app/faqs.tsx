import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
        <Text className="text-base font-bold text-gray-800">{question}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#000"
        />
      </TouchableOpacity>
      {isOpen && (
        <View className="mt-2 mb-3">
          <Text className="text-sm text-gray-600">{answer}</Text>
        </View>
      )}
    </View>
  );
};

const FAQsScreen: React.FC = () => {
  const faqs = [
    {
      question: 'How do I track my shipment?',
      answer: 'Click the "Track" button on the home screen and enter your tracking ID to see real-time updates.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and UPI payments.',
    },
    {
      question: 'Can I cancel my shipment after booking?',
      answer: 'Yes, you can cancel your shipment within 24 hours of booking for a full refund.',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'Tap the "Support" button in the app menu or email us at support@fastfare.com.',
    },
  ];

  return (
    <View className="p-4 bg-white">
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </View>
  );
};

export default FAQsScreen;
