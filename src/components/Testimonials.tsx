import React from 'react';
import { Testimonial04 } from './ui/testimonial-04';

const Testimonials = () => {
  const testimonials = [
    {
      testimonial: "Mosaic helped my family settle into our new life in Australia. The staff understood our cultural needs and provided support in Tagalog. We couldn't have done it without them.",
      name: "Maria Santos",
      role: "Settlement Support Client",
      origin: "Originally from Philippines",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      testimonial: "The family support programs helped us navigate the challenges of raising children in a new country while maintaining our cultural identity. The counselors were incredibly understanding.",
      name: "Ahmed Hassan",
      role: "Family Support Client",
      origin: "Originally from Sudan",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      testimonial: "My elderly mother receives wonderful care that respects our Chinese traditions. The staff speak Mandarin and understand the importance of family in our culture.",
      name: "Li Wei Chen",
      role: "Aged Care Family Member",
      origin: "Originally from China",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      testimonial: "The community engagement programs helped me connect with other families and feel truly part of the Australian community.",
      name: "Jennifer Kim",
      role: "Community Member",
      origin: "Originally from Korea",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      testimonial: "Volunteering with Mosaic has been incredibly rewarding. I've helped families navigate their first months in Australia, and seeing their confidence grow is amazing.",
      name: "Sarah Wilson",
      role: "Volunteer",
      origin: "Local community member",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      testimonial: "The aged care services provided by Mosaic allowed my father to maintain his dignity while receiving the care he needed in his final years.",
      name: "David Chen",
      role: "Family Member",
      origin: "Originally from Taiwan",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  return (
    <Testimonial04 
      testimonials={testimonials}
      title="What Our Community Says"
      subtitle="Real stories from families and individuals whose lives have been transformed through our services"
      bottomText="95% client satisfaction rate"
    />
  );
};

export default Testimonials;