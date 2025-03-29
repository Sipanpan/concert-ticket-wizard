
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { getFeaturedConcerts, getUpcomingConcerts, searchConcerts, Concert } from '@/data/concerts';
import { formatPrice } from '@/lib/utils';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchResults, setSearchResults] = useState<Concert[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const featuredConcerts = getFeaturedConcerts();
  const upcomingConcerts = getUpcomingConcerts();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    setSearchResults(searchConcerts(searchQuery));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const displayedConcerts = isSearching ? searchResults : upcomingConcerts;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-concert-purple/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find and Book <span className="text-concert-purple">Concert Tickets</span> with Ease
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover upcoming concerts, secure the best seats, and create unforgettable memories with your favorite artists.
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search concerts, artists, venues..."
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="k-pop">K-Pop</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="bg-concert-purple hover:bg-purple-700" 
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Concerts Carousel */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Concerts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredConcerts.slice(0, 3).map((concert) => (
              <Link to={`/concert/${concert.id}`} key={concert.id}>
                <div className="group relative rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg">
                  <div className="aspect-[16/9] w-full relative">
                    <img 
                      src={concert.imageUrl} 
                      alt={concert.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-semibold mb-1">{concert.name}</h3>
                      <p className="text-sm opacity-90 mb-1">{concert.artist}</p>
                      <div className="flex items-center text-xs opacity-80">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(concert.date)}</span>
                        <span className="mx-2">•</span>
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{concert.venue}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-concert-orange text-white text-xs font-semibold px-2 py-1 rounded-full">
                    From {formatPrice(concert.price.regular)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Concert Listings */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              {isSearching ? 'Search Results' : 'Upcoming Concerts'}
            </h2>
            {isSearching && (
              <div className="text-sm text-gray-500">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {isSearching && searchResults.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No concerts found</h3>
              <p className="text-gray-500 mb-8">Try different search terms or browse our upcoming concerts</p>
              <Button 
                variant="outline" 
                onClick={() => setIsSearching(false)}
              >
                View All Concerts
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedConcerts.map((concert) => (
                <Link to={`/concert/${concert.id}`} key={concert.id}>
                  <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                    <div className="aspect-[3/2] overflow-hidden">
                      <img 
                        src={concert.imageUrl} 
                        alt={concert.name} 
                        className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 line-clamp-1">{concert.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{concert.artist}</p>
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(concert.date)}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{concert.venue}, {concert.location}</span>
                      </div>
                      <div className="mt-3 text-concert-purple font-semibold">
                        From {formatPrice(concert.price.regular)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Button variant="outline">
              View All Concerts
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Browse by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Pop', 'Rock', 'K-pop', 'Jazz', 'EDM', 'Hip Hop', 'Classical', 'Metal'].map((category) => (
              <div 
                key={category}
                className="bg-gradient-to-r from-concert-purple/10 to-concert-blue/10 rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <h3 className="font-semibold text-concert-purple">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App CTA */}
      <section className="py-16 bg-concert-purple/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Get the ConcertTix App</h2>
              <p className="text-gray-600 mb-6 max-w-lg">
                Download our app for a better experience, exclusive deals, and instant notifications about your favorite artists.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="block">
                  <img src="https://d1fdloi71mui9q.cloudfront.net/uJv2AiEMQI61VYG2PeAW_app-store-badge.png" alt="App Store" className="h-10" />
                </a>
                <a href="#" className="block">
                  <img src="https://d1fdloi71mui9q.cloudfront.net/WCPN4ex2QVKQzCNgq0e6_google-play-badge.png" alt="Google Play" className="h-10" />
                </a>
              </div>
            </div>
            <div className="w-full max-w-xs">
              <img src="https://cdn.dribbble.com/users/1615584/screenshots/15750444/media/4b76771beca201fc103fa1f32294ff4e.jpg?compress=1&resize=400x300&vertical=top" alt="App Screenshot" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
