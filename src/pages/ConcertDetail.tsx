
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, TicketIcon, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { getConcertById } from '@/data/concerts';
import { useCart, CartItem } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { v4 as uuidv4 } from '@/lib/utils';

const ConcertDetail = () => {
  const { id } = useParams<{ id: string }>();
  const concert = getConcertById(id || '');
  const { addItem } = useCart();
  const [selectedTicket, setSelectedTicket] = useState<string>('regular');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!concert) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Concert not found</h2>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddToCart = () => {
    const ticketType = selectedTicket.charAt(0).toUpperCase() + selectedTicket.slice(1);
    const price = concert.price[selectedTicket as keyof typeof concert.price];
    
    const item: CartItem = {
      id: uuidv4(),
      eventId: concert.id,
      eventName: concert.name,
      date: concert.date,
      venue: concert.venue,
      ticketType,
      price,
      quantity,
      imageUrl: concert.imageUrl,
    };
    
    addItem(item);
  };

  return (
    <Layout>
      {/* Concert Hero Banner */}
      <div className="relative h-[40vh] md:h-[50vh] bg-gray-900">
        <img 
          src={concert.bannerUrl || concert.imageUrl} 
          alt={concert.name} 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center text-white mb-4 opacity-80 hover:opacity-100">
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to concerts
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{concert.name}</h1>
            <p className="text-xl text-white/90 mb-3">{concert.artist}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(concert.date)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {formatTime(concert.date)}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {concert.venue}, {concert.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Concert Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="w-full">
                <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                <TabsTrigger value="venue" className="flex-1">Venue</TabsTrigger>
                <TabsTrigger value="terms" className="flex-1">Terms & Conditions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="pt-6">
                <h3 className="text-xl font-semibold mb-4">About This Event</h3>
                <p className="text-gray-700 mb-6">{concert.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Artists</h4>
                  <div className="flex items-center p-4 border rounded-lg">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
                      <img 
                        src={concert.imageUrl} 
                        alt={concert.artist}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="font-semibold">{concert.artist}</h5>
                      <p className="text-sm text-gray-500">Main Performer</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Categories & Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-100 text-concert-purple px-3 py-1 rounded-full text-sm">
                      {concert.category}
                    </span>
                    {concert.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="venue" className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Venue Information</h3>
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">{concert.venue}</h4>
                  <p className="text-gray-700 mb-4">{concert.location}</p>
                  
                  <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gray-200 mb-4">
                    <img 
                      src="https://blog.tiket.com/wp-content/uploads/2019/08/Blog_Inilah-Stadion-GBK-Jakarta-yang-Direnovasi-Menjelang-Asian-Games-2018_1500x1000.jpg" 
                      alt={concert.venue}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h4 className="font-semibold mb-2">How to Get There</h4>
                  <p className="text-gray-700 mb-4">
                    Public transportation options are available near the venue. We recommend using ride-sharing apps or public transit to avoid parking difficulties.
                  </p>
                  
                  <h4 className="font-semibold mb-2">Parking Information</h4>
                  <p className="text-gray-700">
                    Limited parking is available at the venue. Additional parking can be found at nearby facilities for an extra fee.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="terms" className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Terms & Conditions</h3>
                <div className="space-y-4 text-gray-700">
                  <p>By purchasing tickets to this event, you agree to the following terms and conditions:</p>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Ticket Policy</h4>
                    <p>Tickets are non-refundable and non-transferable. Please ensure you have the correct tickets before completing your purchase.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Entry Requirements</h4>
                    <p>All attendees must present a valid ticket and government-issued ID. The name on the ID must match the ticket holder's name.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Prohibited Items</h4>
                    <p>Professional cameras, outside food and beverages, weapons, and illegal substances are strictly prohibited.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Cancellation Policy</h4>
                    <p>In the event of cancellation by the artist or venue, tickets will be refunded at face value. ConcertTix is not responsible for additional expenses incurred.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">COVID-19 Policy</h4>
                    <p>Please follow all current health guidelines. Requirements may change based on local regulations.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Ticket Selection */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Select Tickets</CardTitle>
                <CardDescription>Choose your ticket type and quantity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div 
                    className={`border rounded-lg p-4 transition-colors cursor-pointer ${selectedTicket === 'regular' ? 'border-concert-purple bg-purple-50' : ''}`}
                    onClick={() => setSelectedTicket('regular')}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">Regular Ticket</h4>
                        <p className="text-sm text-gray-500 mb-1">General admission</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          <span>Limited availability</span>
                        </div>
                      </div>
                      <div className="text-lg font-semibold">
                        {formatPrice(concert.price.regular)}
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 transition-colors cursor-pointer ${selectedTicket === 'vip' ? 'border-concert-purple bg-purple-50' : ''}`}
                    onClick={() => setSelectedTicket('vip')}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">VIP Ticket</h4>
                        <p className="text-sm text-gray-500 mb-1">Premium seating, merchandise package</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          <span>Selling fast</span>
                        </div>
                      </div>
                      <div className="text-lg font-semibold">
                        {formatPrice(concert.price.vip)}
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 transition-colors cursor-pointer ${selectedTicket === 'platinum' ? 'border-concert-purple bg-purple-50' : ''}`}
                    onClick={() => setSelectedTicket('platinum')}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">Platinum Ticket</h4>
                        <p className="text-sm text-gray-500 mb-1">Front row, meet & greet, exclusive merch</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          <span>Very limited</span>
                        </div>
                      </div>
                      <div className="text-lg font-semibold">
                        {formatPrice(concert.price.platinum)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Quantity</h4>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="w-10 text-center">{quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                        disabled={quantity >= 10}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>{formatPrice(concert.price[selectedTicket as keyof typeof concert.price] * quantity)}</span>
                  </div>
                  <Button 
                    className="w-full bg-concert-purple hover:bg-purple-700"
                    size="lg"
                    onClick={handleAddToCart}
                  >
                    <TicketIcon className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    By purchasing tickets, you agree to our Terms & Conditions
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConcertDetail;
