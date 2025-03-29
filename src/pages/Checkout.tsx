
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      toast({
        title: "Order successful!",
        description: "Your tickets have been booked successfully.",
      });
      navigate('/confirmation');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">You need to add tickets to your cart before checkout.</p>
            <Link to="/">
              <Button>Browse Concerts</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <Link to="/cart" className="inline-flex items-center text-gray-600 hover:text-concert-purple">
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Cart
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" required className="mt-1" />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <Tabs defaultValue="card">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                      <TabsTrigger value="ewallet">E-Wallet</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="pt-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="cardName">Name on Card</Label>
                              <Input id="cardName" required className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input id="cardNumber" required className="mt-1" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiration">Expiration Date</Label>
                                <Input id="expiration" required className="mt-1" placeholder="MM/YY" />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" required className="mt-1" placeholder="123" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="bank" className="pt-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <p className="text-gray-700">Please complete payment to the following bank account:</p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="mb-1"><strong>Bank:</strong> ConcertTix Bank</p>
                              <p className="mb-1"><strong>Account Number:</strong> 1234567890</p>
                              <p className="mb-1"><strong>Account Name:</strong> ConcertTix Indonesia</p>
                              <p><strong>Reference:</strong> Your order number will be provided after checkout</p>
                            </div>
                            <p className="text-sm text-gray-500">Please upload your payment receipt within 24 hours to confirm your booking.</p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="ewallet" className="pt-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <p className="text-gray-700">Select your preferred e-wallet:</p>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="border rounded-lg p-4 text-center cursor-pointer hover:border-concert-purple">
                                <img src="https://1000logos.net/wp-content/uploads/2021/03/Gopay-logo.png" alt="GoPay" className="h-10 mx-auto mb-2" />
                                <span className="text-sm">GoPay</span>
                              </div>
                              <div className="border rounded-lg p-4 text-center cursor-pointer hover:border-concert-purple">
                                <img src="https://1000logos.net/wp-content/uploads/2021/03/OVO-logo.png" alt="OVO" className="h-10 mx-auto mb-2" />
                                <span className="text-sm">OVO</span>
                              </div>
                              <div className="border rounded-lg p-4 text-center cursor-pointer hover:border-concert-purple">
                                <img src="https://1000logos.net/wp-content/uploads/2021/02/Dana-logo.png" alt="DANA" className="h-10 mx-auto mb-2" />
                                <span className="text-sm">DANA</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500">You will be redirected to complete the payment after checkout.</p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions and privacy policy
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Button 
                  type="submit" 
                  className="w-full bg-concert-purple hover:bg-purple-700" 
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Complete Purchase'}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.eventName}</p>
                        <p className="text-sm text-gray-500">{item.ticketType} x {item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Fee:</span>
                      <span>{formatPrice(getTotalPrice() * 0.05)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span>{formatPrice(getTotalPrice() * 0.11)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>{formatPrice(getTotalPrice() * 1.16)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-gray-500 flex items-start">
                  <CreditCard className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <p>Your payment information is encrypted and secure.</p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
