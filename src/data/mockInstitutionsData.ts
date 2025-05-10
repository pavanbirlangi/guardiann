
// Mock data for institutions
export const mockInstitutionsData = {
  schools: [
    {
      id: 1,
      name: "Greenfield International School",
      address: "123 Education Lane, Delhi",
      city: "Delhi",
      state: "Delhi",
      thumbnail: "https://images.unsplash.com/photo-1613896640137-bb5b31496315?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ],
      description: "Greenfield International School is a premier educational institution dedicated to nurturing global citizens through a holistic curriculum. Our mission is to inspire a passion for learning and empower students to reach their full potential.",
      courses: ["Primary School", "Middle School", "High School"],
      infrastructure: ["Modern Classrooms", "Science Labs", "Computer Labs", "Library", "Sports Facilities", "Auditorium"],
      fees: {
        primary: "₹80,000 - ₹1,00,000 per year",
        middle: "₹1,00,000 - ₹1,20,000 per year",
        high: "₹1,20,000 - ₹1,50,000 per year"
      },
      rating: 4.7,
      contact: {
        phone: "+91 98765 43210",
        email: "info@greenfieldschool.edu",
        website: "www.greenfieldschool.edu"
      }
    },
  ],
  colleges: [
    {
      id: 1,
      name: "National Institute of Technology",
      address: "101 College Road, Delhi",
      city: "Delhi",
      state: "Delhi",
      thumbnail: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ],
      description: "The National Institute of Technology is a leading institution for engineering and technology education. We are committed to excellence in teaching, research, and innovation.",
      courses: ["Computer Science Engineering", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Electronics & Communication"],
      infrastructure: ["Advanced Labs", "Research Centers", "Library", "Hostels", "Sports Complex", "Auditorium"],
      fees: {
        btech: "₹1,25,000 - ₹1,50,000 per year",
        mtech: "₹1,50,000 - ₹1,80,000 per year",
        phd: "₹80,000 - ₹1,00,000 per year"
      },
      rating: 4.9,
      contact: {
        phone: "+91 99887 76655",
        email: "admissions@nit.edu",
        website: "www.nit.edu"
      }
    },
  ],
  coaching: [
    {
      id: 1,
      name: "Brilliant Tutorials",
      address: "303 Coaching Street, Delhi",
      city: "Delhi",
      state: "Delhi",
      thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1522881193457-37ae97c905bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1600195077909-46e573870d99?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ],
      description: "Brilliant Tutorials is a leading coaching center specializing in competitive exam preparation. Our expert faculty, comprehensive study materials, and personalized attention ensure the highest success rates.",
      courses: ["JEE Main & Advanced", "NEET", "Foundation Courses (Class 9-10)"],
      infrastructure: ["Smart Classrooms", "Library", "Discussion Rooms", "Computer Labs", "Practice Test Center"],
      fees: {
        jee: "₹85,000 - ₹1,20,000 per year",
        neet: "₹90,000 - ₹1,30,000 per year",
        foundation: "₹45,000 - ₹60,000 per year"
      },
      rating: 4.5,
      contact: {
        phone: "+91 98123 45678",
        email: "contact@brillianttutorials.com",
        website: "www.brillianttutorials.com"
      }
    },
  ],
  "pg-colleges": [
    {
      id: 1,
      name: "Indian Institute of Management",
      address: "505 MBA Road, Bangalore",
      city: "Bangalore",
      state: "Karnataka",
      thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ],
      description: "The Indian Institute of Management is a world-renowned institution for management education. We develop leaders who can make a difference in the global business landscape through innovative thinking and ethical leadership.",
      courses: ["MBA", "Executive MBA", "PhD in Management", "Management Development Programs"],
      infrastructure: ["Smart Classrooms", "Research Centers", "Library", "Hostels", "Sports Facilities", "Conference Halls"],
      fees: {
        mba: "₹23,00,000 for 2 years",
        emba: "₹27,00,000 for 2 years",
        phd: "₹5,00,000 per year"
      },
      rating: 4.9,
      contact: {
        phone: "+91 80123 45678",
        email: "admissions@iim.ac.in",
        website: "www.iim.ac.in"
      }
    },
  ]
};
