/*'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiArrowLeft, FiCalendar, FiMapPin, FiDollarSign } from 'react-icons/fi'

// Reusable TopNav Component
const TopNav = () => {
  const router = useRouter()
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <button 
          onClick={() => router.back()}
          className="text-[#0f1c47] hover:text-[#bf2c7e] transition-colors flex items-center gap-2"
        >
          <FiArrowLeft className="text-xl" />
          <span className="font-medium">Back</span>
        </button>
      </div>
    </nav>
  )
}

interface Event {
  id: number
  title: string
  date: string
  location: string
  price: string
  image: string
}

const events: Event[] = [
  // ... your existing dummy data
  {
    id: 1,
    title: 'Music Fest 2025',
    date: 'April 20, 2025',
    location: 'Nairobi, Kenya',
    price: 'KES 2,500',
    image: '/images/music-fest.jpg'
  },
  {
    id: 2,
    title: 'Tech Summit 2025',
    date: 'May 10, 2025',
    location: 'Mombasa, Kenya',
    price: 'KES 5,000',
    image: '/images/tech-summit.jpg'
  },
  {
    id: 3,
    title: 'Fashion Show 2025',
    date: 'June 15, 2025',
    location: 'Kisumu, Kenya',
    price: 'KES 3,200',
    image: '/images/fashion-show.jpg'
  }
]

const EventCard = ({ event, onSelect }: { event: Event, onSelect: () => void }) => (
  <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div className="relative h-56 overflow-hidden">
      <img 
        src={event.image} 
        alt={event.title} 
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47]/80 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <h2 className="text-xl font-bold text-white truncate">{event.title}</h2>
        <div className="flex items-center gap-2 mt-1">
          <FiMapPin className="text-[#bf2c7e]" />
          <span className="text-sm text-white/90">{event.location}</span>
        </div>
      </div>
    </div>
    
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#0f1c47]">
          <FiCalendar className="text-[#bf2c7e]" />
          <span className="text-sm font-medium">{event.date}</span>
        </div>
        <button
          onClick={onSelect}
          className="bg-[#bf2c7e] text-white px-4 py-2 rounded-full hover:bg-[#a02468] transition-colors flex items-center gap-2"
        >
          
          <span>{event.price}</span>
        </button>
      </div>
    </div>
  </div>
)

const PaymentModal = ({ event, onClose }: { event: Event, onClose: () => void }) => {
  const router = useRouter()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#0f1c47] mb-2">{event.title}</h2>
          
          <div className="space-y-4 text-[#0f1c47]">
            <div className="flex items-center gap-3">
              <FiCalendar className="text-[#bf2c7e] text-xl" />
              <span className="font-medium">{event.date}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <FiMapPin className="text-[#bf2c7e] text-xl" />
              <span className="font-medium">{event.location}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <FiDollarSign className="text-[#bf2c7e] text-xl" />
              <span className="font-bold text-xl">{event.price}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => {
                onClose()
                router.push(`/pay?event=${event.id}`)
              }}
              className="w-full bg-[#bf2c7e] text-white py-3 rounded-xl hover:bg-[#a02468] transition-colors font-medium"
            >
              Confirm & Pay Now
            </button>
            
            <button
              onClick={onClose}
              className="w-full border-2 border-[#0f1c47] text-[#0f1c47] py-3 rounded-xl hover:bg-[#0f1c47]/5 transition-colors font-medium"
            >
              Cancel Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  
  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0f1c47] mb-3">
            Upcoming <span className="text-[#bf2c7e]">Events</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover exciting events happening near you. Book your spot now!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard 
              key={event.id}
              event={event}
              onSelect={() => setSelectedEvent(event)}
            />
          ))}
        </div>

        {selectedEvent && (
          <PaymentModal 
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </main>
    </div>
  )
}*/

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiArrowLeft, FiCalendar, FiMapPin, FiDollarSign } from 'react-icons/fi'
import Image from 'next/image'
import BottomNavigationBar from '@/components/BottomNav'

interface Seminar {
  _id: string
  name: string
  image: string
  description: string
  date: string
  amount: number
  location?: string
}

// Date formatting utility function
const formatSeminarDate = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

const SeminarCard = ({ seminar, onSelect }: { seminar: Seminar, onSelect: () => void }) => (
  <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div className="relative h-56 overflow-hidden">
      <Image 
        src={seminar.image} 
        alt={seminar.name} 
        fill
        className="object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47]/80 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <h2 className="text-xl font-bold text-white truncate">{seminar.name}</h2>
        {seminar.location && (
          <div className="flex items-center gap-2 mt-1">
            <FiMapPin className="text-[#bf2c7e]" />
            <span className="text-sm text-white/90">{seminar.location}</span>
          </div>
        )}
      </div>
    </div>
    
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#0f1c47]">
          <FiCalendar className="text-[#bf2c7e]" />
          <span className="text-sm font-medium">{formatSeminarDate(seminar.date)}</span>
        </div>
        <button
          onClick={onSelect}
          className="bg-[#bf2c7e] text-white px-4 py-2 rounded-full hover:bg-[#a02468] transition-colors flex items-center gap-2"
        >
          <FiDollarSign />
          <span>KES {seminar.amount.toLocaleString()}</span>
        </button>
      </div>
    </div>
  </div>
)

const PaymentModal = ({ seminar, onClose }: { seminar: Seminar, onClose: () => void }) => {
  const router = useRouter()

  const handlePayment = (forAnother = false) => {
    onClose()
    router.push(`/seminar${forAnother ? '-other' : ''}-payment?amount=${seminar.amount}`)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#0f1c47] mb-2">{seminar.name}</h2>
          <p className="text-gray-600 mb-4">{seminar.description}</p>
          
          <div className="space-y-4 text-[#0f1c47]">
            <div className="flex items-center gap-3">
              <FiCalendar className="text-[#bf2c7e] text-xl" />
              <span className="font-medium">{formatSeminarDate(seminar.date)}</span>
            </div>
            
            {seminar.location && (
              <div className="flex items-center gap-3">
                <FiMapPin className="text-[#bf2c7e] text-xl" />
                <span className="font-medium">{seminar.location}</span>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <FiDollarSign className="text-[#bf2c7e] text-xl" />
              <span className="font-bold text-xl">KES {seminar.amount.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => handlePayment()}
              className="w-full bg-[#bf2c7e] text-white py-3 rounded-xl hover:bg-[#a02468] transition-colors font-medium"
            >
              Pay For Yourself
            </button>
            
            <button
              onClick={() => handlePayment(true)}
              className="w-full bg-[#0f1c47] text-white py-3 rounded-xl hover:bg-[#0f1c47]/90 transition-colors font-medium"
            >
              Pay For Someone Else
            </button>
            
            <button
              onClick={onClose}
              className="w-full border-2 border-[#0f1c47] text-[#0f1c47] py-3 rounded-xl hover:bg-[#0f1c47]/5 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SeminarsPage() {
  const [seminars, setSeminars] = useState<Seminar[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/seminars")
        if (!response.ok) throw new Error("Failed to fetch seminars")
        const data = await response.json()
        setSeminars(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSeminars()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading seminars...</p>
      </div>
      <BottomNavigationBar />
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <p>{error}</p>
      </div>
      <BottomNavigationBar />
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0f1c47] mb-3">
            Upcoming <span className="text-[#bf2c7e]">Seminars</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover valuable seminars happening near you. Register now!
          </p>
        </div>

        {seminars.length === 0 ? (
          <p className="text-center text-gray-500">No seminars available currently.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seminars.map((seminar) => (
              <SeminarCard 
                key={seminar._id}
                seminar={seminar}
                onSelect={() => setSelectedSeminar(seminar)}
              />
            ))}
          </div>
        )}

        {selectedSeminar && (
          <PaymentModal 
            seminar={selectedSeminar}
            onClose={() => setSelectedSeminar(null)}
          />
        )}
      </main>
      <BottomNavigationBar />
    </div>
  )
}