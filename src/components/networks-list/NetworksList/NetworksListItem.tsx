import { Button } from '@/components/ui/Button';
import { Card, CardAction, CardItem, CardTitle } from '@/components/ui/Card';
import {
  ArrowRight,
  Briefcase as BriefcaseIcon,
  MapPin as MapPinIcon,
} from 'lucide-react';
import Link from 'next/link';

interface Props {
  id: string;
  name: string;
  company: string[];
  location: { city: string; country: string };
}

const NetworksListItem = ({ id, name, company, location }: Props) => {
  return (
    <Card tabIndex={0} className="relative card-animate">
      <Link href={`/networks/${id}`} shallow>
        {/* Title */}
        <CardTitle>{name}</CardTitle>

        <CardItem>
          <div className="flex justify-center items-center bg-toreabay-50 w-6 h-6 rounded-s">
            <MapPinIcon className="w-4 h-4 text-grenadier-400" />
          </div>
          <h3 className="text-sm leading-7 text-zinc-500">
            {location.city}, {location.country}
          </h3>
        </CardItem>

        <CardItem className="mb-0">
          <div className="flex justify-center items-center bg-toreabay-50 w-6 rounded-s">
            <BriefcaseIcon className="w-4 h-4 text-grenadier-400" />
          </div>
          <h4 className="text-sm leading-7 text-zinc-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-[236px]">
            {company.join(', ')}
          </h4>
          <span className="border border-grenadier-400 text-grenadier-400 text-sm rounded-[2px] px-1.5 py-1">
            +2
          </span>
        </CardItem>

        <CardAction className="card-action-animate">
          <Button className="flex items-center group text-grenadier-500">
            <span className="card-action-animate-label">Details</span>
            <ArrowRight
              className="ml-1 transition-transform duration-500 ease-out z-10"
              size={20}
            />
          </Button>
        </CardAction>
      </Link>
    </Card>
  );
};

export default NetworksListItem;
