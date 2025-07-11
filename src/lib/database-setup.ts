import { supabase } from './supabase'

export async function setupDatabase() {
  try {
    console.log('Setting up database...')

    // Check if products table exists and has data
    const { data: existingProducts, error: productsError } = await supabase
      .from('products')
      .select('id')
      .limit(1)

    if (productsError) {
      console.error('Error checking products table:', productsError)
      return false
    }

    // If no products exist, insert sample data
    if (!existingProducts || existingProducts.length === 0) {
      console.log('Inserting sample products...')
      
      const sampleProducts = [
        {
          name: 'Lavender Dreams',
          description: 'Relaxing lavender soap perfect for evening routines',
          price: 8.99,
          ingredients: 'Olive oil, coconut oil, lavender essential oil, shea butter',
          benefits: 'Moisturizing, Calming, Aromatherapy',
          in_stock: true
        },
        {
          name: 'Citrus Burst',
          description: 'Energizing citrus soap to start your day right',
          price: 7.99,
          ingredients: 'Olive oil, coconut oil, orange essential oil, lemon essential oil',
          benefits: 'Energizing, Vitamin C, Natural Exfoliation',
          in_stock: true
        },
        {
          name: 'Oatmeal Honey',
          description: 'Gentle exfoliating soap with natural oatmeal and honey',
          price: 9.99,
          ingredients: 'Olive oil, coconut oil, oatmeal, honey, vanilla extract',
          benefits: 'Gentle Exfoliation, Moisturizing, Sensitive Skin',
          in_stock: true
        },
        {
          name: 'Tea Tree Fresh',
          description: 'Purifying tea tree soap for problem skin',
          price: 8.49,
          ingredients: 'Olive oil, coconut oil, tea tree essential oil, charcoal',
          benefits: 'Antibacterial, Purifying, Acne-Fighting',
          in_stock: true
        },
        {
          name: 'Rose Garden',
          description: 'Luxurious rose-scented soap with moisturizing properties',
          price: 10.99,
          ingredients: 'Olive oil, coconut oil, rose essential oil, rose petals, shea butter',
          benefits: 'Moisturizing, Anti-aging, Romantic Scent',
          in_stock: false
        },
        {
          name: 'Mint Refresh',
          description: 'Invigorating mint soap for an energizing shower',
          price: 7.49,
          ingredients: 'Olive oil, coconut oil, peppermint essential oil, spearmint oil',
          benefits: 'Energizing, Cooling, Refreshing',
          in_stock: true
        }
      ]

      const { error: insertError } = await supabase
        .from('products')
        .insert(sampleProducts)

      if (insertError) {
        console.error('Error inserting products:', insertError)
        return false
      }

      console.log('Sample products inserted successfully!')
    }

    // Check if posts table exists and has data
    const { data: existingPosts, error: postsError } = await supabase
      .from('posts')
      .select('id')
      .limit(1)

    if (postsError) {
      console.error('Error checking posts table:', postsError)
      return false
    }

    // Check if events table exists and has data
    const { data: existingEvents, error: eventsError } = await supabase
      .from('events')
      .select('id')
      .limit(1)

    if (eventsError) {
      console.error('Error checking events table:', eventsError)
      return false
    }

    console.log('Database setup completed successfully!')
    return true

  } catch (error) {
    console.error('Error setting up database:', error)
    return false
  }
}

export async function checkDatabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Database connection error:', error)
      return false
    }

    console.log('Database connection successful!')
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}
