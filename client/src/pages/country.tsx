import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, DollarSign, FileText, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { Country } from "@shared/schema";

export default function CountryPage() {
  const { code } = useParams();
  
  const { data: country, isLoading, error } = useQuery<Country>({
    queryKey: [`/api/countries/code/${code}`],
    enabled: !!code,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-visa-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading country information...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Country Not Found</h1>
            <p className="text-gray-600 mb-6">The requested country information could not be found.</p>
            <Link href="/">
              <Button className="bg-visa-blue hover:bg-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="h-64 lg:h-96 overflow-hidden">
          <img 
            src={country.image} 
            alt={`${country.name} landmarks`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl lg:text-8xl mb-4">{country.flag}</div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-2">{country.name}</h1>
              <p className="text-xl lg:text-2xl">{country.description}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Countries
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Visa Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-visa-blue" />
                  Visa Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {country.visaRequired ? (
                    <Badge variant="destructive">Visa Required</Badge>
                  ) : (
                    <Badge className="bg-green-500">Visa Free</Badge>
                  )}
                  {country.eVisaAvailable && (
                    <Badge className="bg-blue-500">e-Visa Available</Badge>
                  )}
                  {country.visaOnArrival && (
                    <Badge className="bg-yellow-500">Visa on Arrival</Badge>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-visa-blue" />
                      <h3 className="font-semibold">Processing Time</h3>
                    </div>
                    <p className="text-gray-600">{country.processingTime}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-visa-blue" />
                      <h3 className="font-semibold">Visa Fee</h3>
                    </div>
                    <p className="text-green-600 font-medium">{country.fee}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Basic Documents</h4>
                    <ul className="space-y-2">
                      {[
                        "Valid passport (6+ months)",
                        "Passport-size photographs",
                        "Completed visa application form",
                        "Proof of travel insurance"
                      ].map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Supporting Documents</h4>
                    <ul className="space-y-2">
                      {[
                        "Bank statements (3-6 months)",
                        "Flight itinerary",
                        "Hotel reservations",
                        "Employment certificate"
                      ].map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Prepare Documents",
                      description: "Gather all required documents according to the checklist above."
                    },
                    {
                      step: "2",
                      title: "Complete Application",
                      description: "Fill out the visa application form completely and accurately."
                    },
                    {
                      step: "3",
                      title: "Submit Application",
                      description: "Submit your application to the embassy or consulate."
                    },
                    {
                      step: "4",
                      title: "Track Status",
                      description: "Monitor your application status and wait for approval."
                    }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 bg-visa-blue rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-visa-blue hover:bg-blue-700">
                  Start Visa Application
                </Button>
                <Button variant="outline" className="w-full">
                  Get Expert Consultation
                </Button>
                <Button variant="outline" className="w-full">
                  Download Document Checklist
                </Button>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    Processing times may vary based on embassy workload
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    Additional documents may be requested during processing
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    Visa fees are non-refundable even if application is rejected
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    Apply well in advance of your planned travel date
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Our visa experts are here to assist you with your application.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Phone:</span>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <span>support@visaservice.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
