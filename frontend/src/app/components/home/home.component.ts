import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Doctor } from '../../models/doctor.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  doctor: Doctor | null = null;
  loading = true;
  error: string | null = null;
  private carouselInterval: any;

  services = [
    { name: 'Root Canal Treatment', icon: '<i class="fas fa-tooth"></i>', description: 'Pain-free RCT with advanced technology' },
    { name: 'Crown & Bridge', icon: '<i class="fas fa-crown"></i>', description: 'High-quality dental crowns and bridges' },
    { name: 'Dental Filling', icon: '<i class="fas fa-teeth"></i>', description: 'Durable and aesthetic dental fillings' },
    { name: 'Scaling & Polishing', icon: '<i class="fas fa-tooth"></i>', description: 'Professional teeth cleaning services' },
    { name: 'Teeth Whitening', icon: '<i class="fas fa-smile-beam"></i>', description: 'Advanced whitening for a brighter smile' },
    { name: 'Oral Surgery', icon: '<i class="fas fa-syringe"></i>', description: 'Safe and precise surgical procedures' },
    { name: 'Cosmetic Dentistry', icon: '<i class="fas fa-star"></i>', description: 'Transform your smile beautifully' },
    { name: 'Preventive Care', icon: '<i class="fas fa-shield-alt"></i>', description: 'Regular check-ups and maintenance' }
  ];

  faqs = [
    {
      question: 'What dental services do you offer?',
      answer: 'We provide comprehensive dental care including root canal treatment, crowns, fillings, scaling & polishing, teeth whitening, oral surgery, cosmetic dentistry, and preventive care.',
      open: false
    },
    {
      question: 'Do you offer painless root canal treatment?',
      answer: 'Yes, we use advanced techniques and local anesthesia to ensure completely painless root canal procedures. Our experienced dentist specializes in comfortable RCT.',
      open: false
    },
    {
      question: 'Is professional teeth whitening safe?',
      answer: 'Absolutely! Our professional teeth whitening procedures are safe, effective, and performed under expert supervision using approved materials.',
      open: false
    },
    {
      question: 'How much does dental treatment cost?',
      answer: 'Our consultation fee is ₹200. Treatment costs vary based on the procedure. We offer transparent pricing and affordable dental care for all patients.',
      open: false
    },
    {
      question: 'How do I book an appointment?',
      answer: 'You can easily book an appointment through our website by clicking the "Book Appointment" button, or contact us directly via phone or email.',
      open: false
    }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDoctor();
    this.startCarousel();
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  startCarousel(): void {
    let currentSlide = 0;
    this.carouselInterval = setInterval(() => {
      const slides = document.querySelectorAll('.carousel-slide');
      slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
          slide.classList.add('active');
        }
      });
      currentSlide = (currentSlide + 1) % slides.length;
    }, 5000);
  }

  toggleFaq(faq: any): void {
    faq.open = !faq.open;
  }

  loadDoctor(): void {
    this.apiService.getDoctorProfile().subscribe({
      next: (doctor) => {
        this.doctor = doctor;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load doctor profile';
        this.loading = false;
        console.error(err);
      }
    });
  }

  getDayName(day: string): string {
    const dayMap: { [key: string]: string } = {
      'Mon': 'Monday',
      'Tue': 'Tuesday',
      'Wed': 'Wednesday',
      'Thu': 'Thursday',
      'Fri': 'Friday',
      'Sat': 'Saturday',
      'Sun': 'Sunday'
    };
    return dayMap[day] || day;
  }
}
